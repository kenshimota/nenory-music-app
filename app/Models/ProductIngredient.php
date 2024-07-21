<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductIngredient extends Model {
    use HasFactory;

    public function product() {
        return $this->belongsTo(Product::class, "product_id", "id");
    }

    public function measure() {
        return $this->belongsTo(Measure::class, "measure_id", "id");
    }

    public function ingredient() {
        return $this->belongsTo(Ingredient::class, "ingredient_id", "id");
    }
    
    protected $fillable = [
        'product_id',
        'ingredient_id',
        'measure_id',
        'quantity',
    ];
}
