<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller {

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request){
        $tableUser = User::query();
        $tableUser->with("role");

        if($request->has("search")){
            $tableUser->where("name", "LIKE", "%{$request->search}%")
                ->orWhere("last_name", "LIKE", "%{$request->search}%")
                ->orWhere("username", "LIKE", "%{$request->search}%")
                ->orWhere("email", "LIKE", "%{$request->search}%");
        }

        return response()->json($tableUser->paginate(20));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request){
        $validator = $request->validate([
            'name' => ['required', 'min:3', 'max:255'],
            'last_name' => ['required', 'min:2', 'max:255' ],
            'username' => ['required', 'unique:users', 'min:6'],
            'email' => ['required','email','unique:users'],
            'password' => ['required', 'min:8'],
            'identity_document' => ['required', 'unique:users'],
            'role_id' => ['required','exists:roles,id']
        ]);


        if (!is_array($validator) &&  $validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        return User::with("role")->create($validator);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        return User::with("role")->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {
        $validator = $request->validate([
            'name' => ['required', 'min:3', 'max:255'],
            'last_name' => ['required', 'min:2', 'max:255' ],
            'password' => ['required', 'min:8'],
            'identity_document' => ['required', 'unique:users'],
            'role_id' => ['required','exists:roles,id']
        ]);

        if (!is_array($validator) && $validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        User::whereId($id)->update($validator);
        return response()->json(User::with("role")->find($id), 202);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id){
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(null, 204);
    }
}
