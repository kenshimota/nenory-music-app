<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Supplier;


class SuppliersController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request){
        $tableSupplier = Supplier::query();

        if($request->has("search")){
            $tableSupplier->where("name", "LIKE", "%{$request->search}%")
                ->orWhere("email", "LIKE", "%{$request->search}%")
                ->orWhere("identity_document", "LIKE", "%{$request->search}%");
        }

        if($request->has("city_id")) {
            $tableSupplier->where("city_id", $request->city_id);
        }

        return response()->json($tableSupplier->paginate(20));

    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request){
        $validator = $request->validate([
            'name' => ['required', 'min:3', 'max:255'],
            'email' => ['required','email','unique:suppliers'],
            'identity_document' => ['required', 'unique:suppliers', 'gt:0'],
            'code_postal' => ['integer'],
            'city_id' => ['required','exists:cities,id'],
            'address' => ['string','min:5','max:255']
        ]);

        if (!is_array($validator) &&  $validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        return Supplier::create($validator);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id){
        return Supplier::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id){
        $validator = $request->validate([
            'name' => ['min:3', 'max:255'],
            'email' => ['email','unique:suppliers'],
            'identity_document' => ['unique:suppliers'],
            'code_postal' => ['integer'],
            'city_id' => ['exists:cities,id'],
            'address' => ['string','min:5','max:255']
        ]);

        if (!is_array($validator) &&  $validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $supplier = Supplier::whereId($id)->update($validator);
        return response()->json(Supplier::find($id), 202);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id){
        $supplier = Supplier::findOrFail($id);
        $supplier->delete();
        return response()->json(null, 204);
    }
}
