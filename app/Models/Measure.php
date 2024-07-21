<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Measure extends Model {
    use HasFactory;

    public function type() {
        return $this->belongsTo(MeasureType::class, "measure_type_id", "id");
    }
}
