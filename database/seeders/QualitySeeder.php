<?php

namespace Database\Seeders;

use App\Models\Quality;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QualitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {

        $qualities = ['U.W', 'C.W'];

        foreach ($qualities as $quality) {
            Quality::query()->updateOrCreate(
                ['name' => $quality],
                ['name' => $quality, 'user_id' => 1]
            );
        }
    }
}
