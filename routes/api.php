<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\DashboardController;
use Illuminate\Support\Facades\Log;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    $user = $request->user();
    $user->load('roles.permissions');
    
    // Debug logging to track role consistency
    Log::info('User roles on /user endpoint:', [
        'user_id' => $user->id,
        'roles' => $user->roles->toArray(),
        'permissions' => $user->getAllPermissions()->toArray()
    ]);
    
    return response()->json([
        'id' => $user->id,
        'name' => $user->name,
        'email' => $user->email,
        'roles' => $user->roles,
        'permissions' => $user->getAllPermissions(),
    ]);
});

// Dashboard routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/profile', [DashboardController::class, 'profile']);
});

// User management routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('users', UserController::class);
});

// Role management routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('roles', RoleController::class);
});

// Permission management routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('permissions', PermissionController::class);
});

// Include auth routes
require __DIR__.'/auth.php';
