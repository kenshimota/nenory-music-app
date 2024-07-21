<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;

    public function supplier() {
        return $this->belongsTo(Supplier::class, "supplier_id", "id");
    }

    public function user() {
        return $this->belongsTo(User::class, "user_id", "id");
    }
    public function purchaseItems() {
        return $this->hasMany(PurchaseItem::class, "purchase_id", "id");
    }

    protected $fillable = [
        'supplier_id',
        'user_id',
        "state",
        'number',
        'amount',
        'product_count',
        'quantity_total',
    ];
}
