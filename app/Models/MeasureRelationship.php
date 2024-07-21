<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MeasureRelationship extends Model {
    use HasFactory;

    public function measure() {
        return $this->belongsTo(Measure::class, "measure_id", "id");
    }

    public function relationship() {
        return $this->belongsTo(Mesuare::class, "related_measure_id", "id");
    }
}
