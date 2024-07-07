<?php

namespace App\Http\Controllers\API;

use App\Models\City;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CitiesController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) { 
        $tableCity = City::query();

        if($request->has("search")){
            $tableCity->where("name", "LIKE", "%{$request->search}%");
        }

        return response()->json($tableCity->paginate(20));
    }
}
