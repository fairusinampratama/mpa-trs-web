<?php
use Illuminate\Support\Facades\Route;
Route::view('/', 'welcome')->name('home');
Route::get('/health', function () {
    return response()->json(['status' => 'ok', 'revision' => config('deployment.revision')])
        ->header('Cache-Control', 'no-store')->header('X-Content-Type-Options', 'nosniff');
})->name('health');
