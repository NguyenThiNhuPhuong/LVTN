<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;

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

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

   /*----------------AUTH-------------------*/
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
    Route::post('/change-pass', [AuthController::class, 'changePassWord']);
});
/*----------------ADDRESS-------------------*/
Route::group([
    'prefix' => 'address'
], function ($router) {
    Route::get('/provinces', [AddressController::class, 'getListProvince']);
    Route::get('provinces-districts/{id}', [AddressController::class, 'getListDistrict']);
    Route::get('/districts-wards/{id}', [AddressController::class, 'getListWard']);
    Route::get('/provinces/{id}', [AddressController::class, 'getProvince']);
    Route::get('/districts/{id}', [AddressController::class, 'getDistrict']);
    Route::get('/wards/{id}', [AddressController::class, 'getWard']);

});
/*----------------USER-------------------*/

Route::apiResource('users', UserController::class);

/*----------------CATEGORY-------------------*/

Route::apiResource('categories', CategoryController::class);

/*----------------PRODUCT-------------------*/
Route::get('/products/active', [ProductController::class, 'listProductActive']);
Route::get('/products/active/out-of-stock', [ProductController::class, 'listActiveOutOfStock']);
Route::apiResource('products', ProductController::class);


/*----------------ODER-------------------*/
Route::apiResource('orders', OrderController::class);

/*----------------SLIDER-------------------*/
Route::apiResource('sliders', SliderController::class);

/*----------------DISCOUNT-------------------*/
Route::apiResource('discounts', DiscountController::class);

