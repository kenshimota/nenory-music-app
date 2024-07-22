<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Ingredient;
use App\Http\Controllers\Controller;

class IngredientsController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request){
        $tableIngredient = Ingredient::query();
        $tableIngredient->with("measure");

        if($request->has("measure_id")) {
            $tableIngredient->where("measure_id", $request->measure_id);
        }

        if($request->has("search")){
            $tableIngredient->where("name", "LIKE", "%{$request->search}%");
        }

        return $tableIngredient->paginate(20);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $validator = $request->validate([
            'name' => ['required', 'min:4', 'max:255', 'unique:ingredients'],
            'measure_id' => ["required", "exists:measures,id"],
        ]);


        if (!is_array($validator) &&  $validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        return response()->json(Ingredient::create($validator));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        return Ingredient::with("measure")->findOrFail($id);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id){
        $ingredient = Ingredient::with("measure")->findOrFail($id);

        $validator = $request->validate([
            'name' => ['required','min:4','max:255', 'unique:ingredients,name,'.$id],
            'measure_id' => ["required", "exists:measures,id"],
        ]);

        if (!is_array($validator) &&  $validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $ingredient->name = $validator["name"];
        if($ingredient->measure_id != $validator["measure_id"]){
            $stock = $ingredient->convertFromMeasure($ingredient->measure_id, $validator["measure_id"], $ingredient->stock);
            $ingredient->stock = $stock;
            $ingredient->measure_id = $validator["measure_id"];
        }

        $ingredient->save();
            
        # Ingredient::whereId($id)->update($validator);
        return response()->json(Ingredient::with("measure")->find($id), 202);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        $ingredient = Ingredient::findOrFail($id);
        $ingredient->delete();
        return response()->json(null, 204);
    }
}
