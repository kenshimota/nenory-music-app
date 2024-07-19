<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\PurchaseItem;

class PurchaseItemsController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request){
        $table = PurchaseItem::query();
        $table->with("purchase","ingredient","measure");

        if($request->has("purchase_id")) {
            $table->where("purchase_id", $request->purchase_id);
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
    public function store(Request $request) {
        $validator = $request->validate([
            'purchase_id' => ["required", "exists:purchases,id"],
            'ingredient_id' => ["required", "exists:ingredients,id"],
            'measure_id' => ["required", "exists:measures,id"],
            'quantity' => ["required", "numeric", "gt:0"],
            'cost' => ["required", "numeric", "gt:0"],
        ]);

        if (!is_array($validator) &&  $validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $purchaseItem = PurchaseItem::create($validator);
        $purchase = $purchaseItem->purchase()->first();
        $purchase->amount += $purchaseItem->cost;
        $purchase->product_count += 1;
        $purchase->save();

        return $purchaseItem;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        return PurchaseItem::with("purchase","ingredient","measure")->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id){
        $purchaseItem = PurchaseItem::with("purchase","ingredient","measure")->findOrFail($id);

        $validator = $request->validate([
            'quantity' => ["required", "numeric", "gt:0"],
            'cost' => ["required", "numeric", "gt:0"],
        ]);

        if (!is_array($validator) &&  $validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $purchaseItemBefore = PurchaseItem::whereId($id)->with("purchase")->first();
        PurchaseItem::whereId($id)->update($validator);
        $purchaseItem = PurchaseItem::with("purchase","ingredient","measure")->find($id);
        $purchase = $purchaseItemBefore->purchase()->first();

        $newCost = $purchaseItem->cost - $purchaseItemBefore->cost;
        $purchase->amount += $newCost;
        $purchase->save();

 
        return response()->json(PurchaseItem::with("purchase","ingredient","measure")->find($id), 202);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id){
        $purchaseItem = PurchaseItem::findOrFail($id);
        $purchase = $purchaseItem->purchase()->first();
        $purchase->amount -= $purchaseItem->cost;
        $purchase->product_count -= 1;
        $purchase->save();
        $purchaseItem->delete();
        return response()->json(null, 204);
    }
}
