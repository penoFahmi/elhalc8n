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
    Schema::create('experiences', function (Blueprint $table) {
        $table->id();
        $table->enum('type', ['education', 'work']);
        $table->string('title'); // e.g., S1 Teknik Informatika
        $table->string('institution');
        $table->date('start_date');
        $table->date('end_date')->nullable(); // Null berarti "Present" atau "Masih Berlangsung"
        $table->text('description')->nullable();
        $table->integer('order_number')->default(0);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('experiences');
    }
};
