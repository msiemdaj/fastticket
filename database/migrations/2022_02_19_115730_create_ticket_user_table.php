<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTicketUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ticket_user', function (Blueprint $table) {
            $table->foreignId('ticket_id')->constrained()->cascadeOnUpdate();
            $table->foreignId('user_id')->constrained()->cascadeOnUpdate();
            $table->foreignId('worker_id')->nullable()->references('id')->on('users')->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ticket_user');
    }
}
