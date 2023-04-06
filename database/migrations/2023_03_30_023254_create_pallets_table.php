<?php

use App\Models\Quality;
use App\Models\Species;
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
        Schema::create('pallets', static function (Blueprint $table) {
            $table->id();
            $table->string('pallet_number')->unique();
            $table->string('thickness')->nullable();
            $table->foreignIdFor(Quality::class)->nullable()->constrained();
            $table->foreignIdFor(Species::class)->nullable()->constrained();
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
    public function down()
    {
        Schema::dropIfExists('pallets');
    }
};
