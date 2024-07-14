<?php
namespace App\Http\Controllers\API;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Mail;
use App\Mail\MailVerifyCode;




class AuthController extends Controller {

    /**
     * Inicio de sesión y creación de token
     */
    public function signIn(Request $request) {
        $request->validate([
            'username' => 'required|string|min:6',
            'password' => 'required|string|min:8'
        ]);

        $user = User::where("username", request("username"))->first();

        if(!$user) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $credentials = [
            "password" => request("password"), 
            "email" => $user->email
        ];

        if (!Auth::attempt($credentials)){
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $user = $request->user();
        return $this->renderSession($user);
    }

    /*
    Esto es para realizar la creradcion de un usuario
    */
    public function signUp(Request $request){
        $validator = $request->validate([
            'name' => ['required', 'min:3', 'max:255'],
            'last_name' => ['required', 'min:2', 'max:255' ],
            'username' => ['required', 'unique:users', 'min:6'],
            'email' => ['required','email','unique:users'],
            'password' => ['required', 'min:8'],
            'identity_document' => ['required', 'unique:users'],
        ]);


        if (!is_array($validator) &&  $validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validator["roles_id"]= 1;

        $user = User::create([
            'name' => $request->name,
            'last_name'=> $request->last_name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => $request->password,
            'identity_document' => $request->identity_document,
            "role_id" => Role::where('name', 'admin')->first()->id,
        ]);


        return $this->renderSession($user);
    }



    /**
     * Cierre de sesión y eliminación del token
     *
     */
    public function signOut(Request $request) {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);

    }
    
    /**
     * Obtener el objeto User como json
     */
    public function user(Request $request){
        return response()->json($request->user());
    }


    public function forgotPassword(Request $reques){
        $validator = $reques->validate([
            'email' => ['required','email','exists:users,email']
        ]);
    
        if (!is_array($validator) &&  $validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $code = \rand(100000, 999999);
        $user = User::where('email', $validator['email'])->first();

        $user->code_mail = $code;
        $user->code_verificated = false;
        $user->code_mail_expire_at = now()->addMinutes(30);
        $user->save();

        Mail::to($validator['email'])->send(new MailVerifyCode($user, $code));
        return response()->json(['message' => 'Email sent successfully'], 201);
    }

    public function verifyCodePassword(Request $request){
        $validator = $request->validate([
            'code' => ['required'],
            'email' => ['required','email','exists:users,email'],
        ]);

        if (!is_array($validator) &&  $validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $validator['email'])->first();


        $now = Carbon::now();
        $expire_at = Carbon::parse($user->code_mail_expire_at);


        if($user->code_verificated ){
            return response()->json(["errors" => ["code" => ["El codigo ha sido usado"]]], 422);
        }

        if($now->greaterThan($user->code_mail_expire_at)){
            return response()->json(["errors" => ["code" => ["El codigo esta expirado"]]], 422);
        }

        if($user->code_mail != $validator['code']){
            return response()->json(["errors" => ["code" => ["El codigo no coincide"]]], 422);
        }

        $user->code_mail = null;
        $user->code_verificated = true;
        $user->save();

        return response()->json(["succces" => true, "message"=> "El codigo fue verificado"], 202);
    }

    public function resetPassword(Request $request){
        $validator = $request->validate([
            'password' => ['required','min:8'],
            'email' => ['required','email','exists:users,email'],
            'confirm_password' => ["required", "min:8", "same:password"],
        ]);

        if (!is_array($validator) &&  $validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $validator['email'])->first();


        if(!$user->code_verificated){
            return response()->json(["errors" => ["code" => ["El codigo no esta verificado"]]], 422);
        }

        $user->password = \Hash::make($validator['password']);
        $user->code_mail = null;
        $user->code_verificated = null;
        $user->code_mail_expire_at = null;
        $user->save();

        return $this->renderSession($user);
    }

    private function renderSession(User $user) {
        $tokenResult = $user->createToken('key-access-token');
        $token = $tokenResult->token;
        $token->save();

        return response()->json([
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse($token->expires_at)->toDateTimeString(),
            'access_token' => $tokenResult->accessToken,
        ]);
    }


}