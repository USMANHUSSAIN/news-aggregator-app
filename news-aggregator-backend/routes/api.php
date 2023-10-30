<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserCategoriesPreferencesController;
use App\Http\Controllers\UserAuthorsPreferencesController;
use App\Http\Controllers\UserSourcesPreferencesController;
use App\Http\Controllers\NewsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// User Registration
Route::post('register', [UserController::class, 'register']);

// User Login
Route::post('login', [UserController::class, 'login']);

// Fetch News API
Route::get('news-api-headline', [NewsController::class, 'fetchNewsApiHeadline']);
Route::get('news-api-filter', [NewsController::class, 'fetchNewsApiFilter']);

// Fetch The Guardian API
Route::get('guardian-home', [NewsController::class, 'fetchGuardianApiHome']);
Route::get('guardian-filter', [NewsController::class, 'fetchGuardianApiFilter']);

// Fetch New York Times API
Route::get('nyt-home', [NewsController::class, 'fetchNYTApiHome']);
Route::get('nyt-filter', [NewsController::class, 'fetchNYTApiFilter']);

// User Category Preferences
Route::prefix('user-categories-preferences')->group(function () {
    Route::post('/', [UserCategoriesPreferencesController::class, 'store']);
    Route::get('/', [UserCategoriesPreferencesController::class, 'show']);
    Route::delete('/', [UserCategoriesPreferencesController::class, 'destroy']);
});

// User Author Preferences
Route::prefix('user-authors-preferences')->group(function () {
    Route::post('/', [UserAuthorsPreferencesController::class, 'store']);
    Route::get('/', [UserAuthorsPreferencesController::class, 'show']);
    Route::delete('/', [UserAuthorsPreferencesController::class, 'destroy']);
});

// User Source Preferences
Route::prefix('user-sources-preferences')->group(function () {
    Route::post('/', [UserSourcesPreferencesController::class, 'store']);
    Route::get('/', [UserSourcesPreferencesController::class, 'show']);
    Route::delete('/', [UserSourcesPreferencesController::class, 'destroy']);
});

