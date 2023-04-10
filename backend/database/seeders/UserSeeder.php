<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $listUser= [
            [
                'name' =>'System Admin',
                'email' => 'admin@gmail.com',
                'type' => 1,
                'password' => Hash::make('lvtn@123'),
            ]
        ];

        foreach ($listUser as $user) {
            DB::table('users')->updateOrInsert($user);
        }
    }
}
