<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseItem extends Model{
    use HasFactory;

    public function ingredient() {
        return $this->belongsTo(Ingredient::class, "ingredient_id", "id");
    }

    public function purchase() {
        return $this->belongsTo(Purchase::class, "purchase_id", "id");
    }

    public function measure() {
        return $this->belongsTo(Measure::class, "measure_id", "id");
    }


    protected $fillable = [
        'ingredient_id',
        'quantity',
        'measure_id',
        'cost',
        'purchase_id',
    ];
}
