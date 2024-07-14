<?php

namespace App\Http\Middleware\API;

use Closure;
use Illuminate\Http\Request;

class ForceJsonResponse {
    public function handle($request, Closure $next){
        $request->headers->set('Accept', 'application/json');
        return $next($request);
    }
}