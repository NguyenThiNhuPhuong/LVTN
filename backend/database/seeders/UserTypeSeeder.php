<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $listUserType = [
            ['name' => 'Admin'],
            ['name' => 'User'],
            ['name' => 'Shipper']
        ];

        foreach ($listUserType as $userType) {
            DB::table('user_type')->updateOrInsert($userType);
        }
    }
}
