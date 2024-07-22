<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\ProductIngredient;
use App\Http\Controllers\Controller;


class ProductIngredientsController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index(Request  $request){
        $table = ProductIngredient::query();
        $table->with("product","ingredient","measure");

        if($request->has("product_id")) {
            $table->where("product_id", $request->product_id);
        }

        if($request->has("ingredient_id")) {
            $table->where("ingredient_id", $request->ingredient_id);
        }

        if($request->has("measure_id")) {
            $table->where("measure_id", $request->measure_id);
        }

        return $table->paginate(20);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request){
        $validator = $request->validate([
            'product_id' => ["required", "exists:products,id"],
            'measure_id' => ["required", "exists:measures,id"],
            'ingredient_id' => ["required", "exists:ingredients,id"],
            'quantity' => ["required", "numeric", "gt:0"],
        ]);

        if (!is_array($validator) &&  $validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        return ProductIngredient::create($validator);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id){
        return ProductIngredient::with("product","ingredient","measure")->findOrFail($id);   
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id){
        $validator = $request->validate([
            'quantity' => ["required", "numeric", "gt:0"],
        ]);

        if (!is_array($validator) &&  $validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $productIngredient = ProductIngredient::whereId($id)->update($validator);
        return response()->json(ProductIngredient::with("product","ingredient","measure")->find($id), 202);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        $productIngredient = ProductIngredient::findOrFail($id);
        $productIngredient->delete();
        return response()->json(null, 204);
    }
}
