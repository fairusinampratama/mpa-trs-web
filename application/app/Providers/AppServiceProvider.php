<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // No application bindings yet.
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (config('deployment.revision') !== 'development') {
            \Illuminate\Support\Facades\Vite::useBuildDirectory('mpa-trs-assets/'.config('deployment.revision'));
        }
    }
}

