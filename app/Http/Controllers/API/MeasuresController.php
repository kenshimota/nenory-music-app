<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Measure;

class MeasuresController extends Controller {

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        return Measure::all();
    }

}
