<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->bigInteger('user_id')->unsigned();
            $table->string('name');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->integer('price_product');
            $table->integer('price_ship');
            $table->integer('price_all');
            $table->bigInteger('discount_id')->unsigned();
            $table->bigInteger('province_id')->unsigned();
            $table->bigInteger('district_id')->unsigned();
            $table->bigInteger('ward_id')->unsigned();
            $table->string('address');
            $table->string('note')->nullable();
            $table->bigInteger('order_status_id')->unsigned();
            $table->bigInteger('created_by')->unsigned()->nullable();
            $table->bigInteger('updated_by')->unsigned()->nullable();
            $table->timestamps();
            $table->timestamp('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
