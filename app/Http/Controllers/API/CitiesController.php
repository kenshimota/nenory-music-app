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
        $tableCity->with("state");

        if($request->has("search")){
            $tableCity->where("name", "LIKE", "%{$request->search}%");
        }

        if($request->has("state_id")){
            $tableCity->where("state_id", $request->state_id);
        }

        return response()->json($tableCity->paginate(20));
    }
}
