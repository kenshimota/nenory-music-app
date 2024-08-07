<?php

namespace App\Providers;

use Illuminate\Routing\UrlGenerator;
use Illuminate\Support\ServiceProvider;
use Laravel\Passport\Passport;

class AppServiceProvider extends ServiceProvider {

    /**
     * Register any application services.
     */
    public function register(): void{
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(UrlGenerator $url): void {
        Passport::tokensExpireIn(now()->addMinutes(45));
        Passport::refreshTokensExpireIn(now()->addMinutes(90));
        Passport::personalAccessTokensExpireIn(now()->addMinutes(45));
        
        if (env('APP_ENV') == 'production') {
            $url->forceScheme('https');
        }
    }
}
