<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Product;


class ProductController extends Controller{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return Product::all();
    }

    public function store(Request $request) {
        $validator = $request->validate([
            'code' => ['required','min:5','unique:products'],
            'name' => ['required', 'min:4', 'max:255']
        ]);

        if (!is_array($validator) &&  $validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        return Product::create($validator);
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id){
        return Product::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id){
        $validator = $request->validate([
            'code' => ['required','min:5','unique:products'],
            'name' => ['required', 'min:4', 'max:255'],
        ]);

        if (!is_array($validator) &&  $validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $product = Product::whereId($id)->update($validator);
        return response()->json(Product::find($id), 202);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(null, 204);
    }
}
