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
        Schema::create('discounts', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->integer('discount');
            $table->string('description')->nullable();
            $table->integer('minium_order');
            $table->integer('purchase_limit');
            $table->integer('purchase_current');
            $table->dateTime('expiration_date');
            $table->bigInteger('created_by')->default(0)->unsigned();
            $table->bigInteger('updated_by')->default(0)->unsigned();
            $table->timestamps();
            $table->timestamp('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('discounts');
    }
};
