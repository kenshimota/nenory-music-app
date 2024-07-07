<?php
namespace App\Http\Controllers\API;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller {

    /**
     * Inicio de sesión y creación de token
     */
    public function signIn(Request $request) {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string'
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