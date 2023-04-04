<?php

use App\Models\Pallet;
use App\Models\PalletLog;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('wood', static function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(PalletLog::class)->constrained();
            $table->integer('number');
            $table->string('sub_log');
            $table->string('parcel')->nullable();
            $table->integer('length');
            $table->integer('width');
            $table->integer('sheets');
            $table->decimal('square_meter');
            $table->foreignIdFor(User::class)->constrained();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('wood');
    }
};
