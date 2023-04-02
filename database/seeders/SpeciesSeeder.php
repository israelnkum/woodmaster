<?php

namespace Database\Seeders;

use App\Models\Species;
use Illuminate\Database\Seeder;

class SpeciesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $species = ['Koto'];

        foreach ($species as $spec) {
            Species::query()->updateOrCreate(
                ['name' => $spec],
                ['name' => $spec, 'user_id' => 1]
            );
        }
    }
}
