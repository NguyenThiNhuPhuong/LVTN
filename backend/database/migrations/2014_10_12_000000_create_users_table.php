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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('avatar')->default("https://tse2.mm.bing.net/th?id=OIP.lF8ztkPyzv_NrpD7V8YYVAHaHa&pid=Api&P=0");
            $table->string('email')->unique();
            $table->bigInteger('type')->unsigned();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('phone')->nullable();
            $table->bigInteger('province_id')->nullable()->unsigned();
            $table->bigInteger('district_id')->nullable()->unsigned();
            $table->bigInteger('ward_id')->nullable()->unsigned();
            $table->string('address')->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
};
