<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\State;

class StatesController extends Controller {
    
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) { 
        $tableState = State::query();

        if($request->has("search")){
            $tableState->where("name", "LIKE", "%{$request->search}%");
        }

        return response()->json($tableState->paginate(20));
    }
}
