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
    public function index()
    {
        return Purchase::all();
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
        return Purchase::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id){

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
