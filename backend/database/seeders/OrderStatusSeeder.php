<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $listOrderStatus = [
            [
                'name' => 'Chờ xác nhận',
                'description' => 'Chờ shop xác nhận đủ điều kiện tiến hành giao hàng.'
            ],
        ];

        foreach ($listOrderStatus as $orderStatus) {
            DB::table('order_status')->updateOrInsert($orderStatus);
        }
    }
}
