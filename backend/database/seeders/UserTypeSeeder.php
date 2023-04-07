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
        $list_user_type=[
            ['name' => 'Admin'],
            ['name' => 'User'],
            ['name' => 'Shipper']
        ];
        foreach ($list_user_type as $type){
            DB::table('user_type')->updateOrInsert($type);
        }

    }
}
