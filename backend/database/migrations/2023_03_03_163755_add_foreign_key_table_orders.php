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
        Schema::table('orders', function (Blueprint $table) {
            $table->foreign('created_by')->references('id')->on('users');
            $table->foreign('updated_by')->references('id')->on('users');
            $table->foreign('order_status_id')->references('id')->on('order_status');
            $table->foreign('ward_id')->references('id')->on('wards');
            $table->foreign('district_id')->references('id')->on('districts');
            $table->foreign('province_id')->references('id')->on('provinces');
            $table->foreign('discount_id')->references('id')->on('discounts');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign('orders_updated_by_foreign');
            $table->dropForeign('orders_created_by_foreign');
            $table->dropForeign('orders_order_status_id_foreign');
            $table->dropForeign('orders_ward_id_foreign');
            $table->dropForeign('orders_district_id_foreign');
            $table->dropForeign('orders_province_id_foreign');
            $table->dropForeign('orders_discount_id_foreign');
            $table->dropForeign('orders_user_id_foreign');
        });
    }
};
