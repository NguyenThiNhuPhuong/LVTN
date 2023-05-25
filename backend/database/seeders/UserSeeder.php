<?php

namespace Database\Seeders;

use Carbon\Carbon;
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
                'email_verification_token'=> Carbon::now(),
                'email_verified_at' => Carbon::now()

            ]
        ];

        foreach ($listUser as $user) {
            DB::table('users')->updateOrInsert($user);
        }
    }
}
