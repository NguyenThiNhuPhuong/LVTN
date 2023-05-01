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
                'description' => 'Chờ shop xác nhận đủ điều kiện đặt hàng.'
            ],
            [
                'name' => 'Chờ lấy hàng',
                'description' => 'Đơn hàng  đang được chuẩn bị.'
            ],
            [
                'name' => 'Đang giao',
                'description' => 'Đơn hàng đang được giao đến khách hàng.'
            ],
            [
                'name' => 'Đã giao',
                'description' => 'Đơn hàng đã giao thành công.'
            ],
            [
                'name' => 'Đã hủy',
                'description' => 'Đơn hàng đã hủy.'
            ],
            [
                'name' => 'Trả hàng',
                'description' => 'Trả hàng Thành công.'
            ],
        ];

        foreach ($listOrderStatus as $orderStatus) {
            DB::table('order_status')->updateOrInsert($orderStatus);
        }
    }
}
