<?php
namespace App\Http\Controllers\API;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Role;


class AuthController extends Controller {

    /**
     * Inicio de sesión y creación de token
     */
    public function signIn(Request $request) {
        $request->validate([
            'username' => 'required|string|min:6',
            'password' => 'required|string|min:8'
        ]);
//
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
        $tokenResult = $user->createToken('key-access-token');
        $token = $tokenResult->token;
        $token->save();

        return response()->json([
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse($token->expires_at)->toDateTimeString(),
            'access_token' => $tokenResult->accessToken,
        ]);
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
        $tokenResult = $user->createToken('key-access-token');
        $token = $tokenResult->token;
        $token->save();

        return response()->json([
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse($token->expires_at)->toDateTimeString(),
            'access_token' => $tokenResult->accessToken,
        ]);

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
}