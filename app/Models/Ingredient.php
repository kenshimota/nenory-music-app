<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model {
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'measure_id',
    ];


    public function convertMeasure($measure_id, $quantity) {
        $query = MeasureRelationship::query();
        $relationship = $query->where("measure_id", $measure_id)
            ->where("related_measure_id", $this->measure_id)
            ->first();

        if(empty($relationship)){
            return $quantity;
        }

        return $quantity / $relationship->amount;
    }
    


    public function measure() {
        return $this->belongsTo(Measure::class, "measure_id", "id");
    }
}
