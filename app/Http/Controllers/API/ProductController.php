<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use App\Models\ProductIngredient;
use App\Models\Ingredient;

class ProductController extends Controller{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $tableProduct = Product::query();

        if($request->has("search")){
            $tableProduct->where("name", "LIKE", "%{$request->search}%")
                    ->orWhere("code", "LIKE", "%{$request->search}%");
        }

        return $tableProduct->paginate(20);
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
        $product = Product::findOrFail($id);

        $validator = $request->validate([
            'code' => ['required','min:5','unique:products,code,'.$product->id],
            'name' => ['required', 'min:4', 'max:255'],
        ]);

        if (!is_array($validator) &&  $validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $product = Product::whereId($id)->update($validator);
        return response()->json(Product::find($id), 202);
    }


    /**
     * Update the specified resource in storage.
     */
    public function updateStock(Request $request, string $id){
        $product = Product::findOrFail($id);

        $validator = $request->validate([
            'quantity' => ['required', 'gt:0'],
        ]);

        if (!is_array($validator) &&  $validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $product_ingredients = ProductIngredient::where("product_id", "=", $id)->get();
        $this->quantitySended = $validator["quantity"];

        $quantities = $product_ingredients->filter(function(ProductIngredient $pi){
            $ingredient = $pi->ingredient()->first();
            $quantity = $ingredient->convertMeasure( $pi->measure_id, $pi->quantity ) * $this->quantitySended;
            return $quantity < $ingredient->stock;
        })->map(function(ProductIngredient $pi){
            $ingredient = $pi->ingredient()->first();
            $quantity = $ingredient->convertMeasure( $pi->measure_id, $pi->quantity );
            return $quantity;
        });        


        if(count($quantities) < count($product_ingredients)){
            return response()->json(["error" => "No hay suficiente existencia para todos los ingredientes."], 400);
        }

        if(count($quantities) === 0) {
            return response()->json(["error" => "No hay ingredientes disponibles, No se puede procesar sin ingredientes"], 400);
        }

        foreach($product_ingredients as $pi){
            $ingredient = $pi->ingredient()->first();
            $quantity = $ingredient->convertMeasure( $pi->measure_id, $pi->quantity );
            $ingredient->stock -= $quantity * $validator["quantity"];
            $ingredient->save();
        }

        $product->stock += $validator["quantity"];
        $product->save();

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
