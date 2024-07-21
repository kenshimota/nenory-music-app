<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Purchase;

class PurchasesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request){
        $tablePurchase = Purchase::query();
        $tablePurchase->with(["supplier", "user"])->select("purchases.*");
        $tablePurchase->join('suppliers', 'suppliers.id', '=', 'purchases.supplier_id');

        if($request->has("search")){
            $tablePurchase->where("number", "LIKE", "%{$request->search}%");
            $tablePurchase->orWhere("purchases.number", "LIKE", "%{$request->search}%");
        }

        if($request->has("from")){
            $tablePurchase->where("purchases.created_at", ">=", $request->from);
        }

        if($request->has("to")){
            $tablePurchase->where("purchases.created_at", "<=", $request->to);
        }

        if($request->has("supplier_id")){
            $tablePurchase->where("supplier_id", $request->supplier_id);
        }

        if($request->has("user_id")){
            $tablePurchase->where("user_id", $request->user_id);
        }

        return $tablePurchase->paginate(20);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $validator = $request->validate([            
            'supplier_id' => ['required', 'exists:suppliers,id'],
        ]);

        if (!is_array($validator) &&  $validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user= $request->user();

        $number = 1;
        $tableQuery = Purchase::query();
        $lastPurchase = $tableQuery->limit(1)->orderByRaw("ID DESC")->first();
    
        if(!empty($lastPurchase)){
        $number = $lastPurchase->number + 1;
    }

        return Purchase::create([
            "number" => $number,
            "supplier_id" => request("supplier_id"),
            "user_id" => $user->id,
            "amount" => 0,
            "product_count" => 0,
            "quantity_total" => 0,
        ]);
            
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id){
        return Purchase::with(["supplier", "user"])->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id){
        $arr = [];
        $purchase = Purchase::with(["supplier", "user"])->findOrFail($id);
        $items = $purchase->purchaseItems()->with(["ingredient", "measure"])->get();

        foreach($items as $item) {
            $ingredient = $item->ingredient()->first();
            $quantity = $ingredient->convertMeasure($item->measure_id, $item->quantity);
           $ingredient->stock += $quantity;
            $ingredient->save();
        }

        $purchase->state = "completed";
        $purchase->save();
        
        $purchase = Purchase::with(["supplier", "user"])->findOrFail($id);

        return response()->json($purchase, 202);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        $purchase = Purchase::findOrFail($id);
        $purchase->delete();
        return response()->json(null, 204);
    }
}
