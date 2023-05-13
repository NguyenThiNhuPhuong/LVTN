<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_approval', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('order_id')->unsigned();
            $table->bigInteger('order_status_id')->unsigned();
            $table->bigInteger('user_id')->unsigned();
            $table->string('comment')->nullable();
            $table->dateTime('action_time');
            $table->timestamp('deleted_at')->nullable();
            $table->foreign('order_status_id')->references('id')->on('order_status');
            $table->foreign('order_id')->references('id')->on('orders');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_approval');
    }
};
