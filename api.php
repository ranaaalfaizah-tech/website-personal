<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
Route::apiResource('products', ProductController::class);
Route::get('health', fn()=>['status'=>'ok','service'=>'neo-nero-api']);
