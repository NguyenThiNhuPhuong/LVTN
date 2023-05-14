<?php
namespace App\Services;


use App\Repositories\CategoryRepository;
use App\Repositories\OrderApprovalRepository;
use App\Repositories\ProductRepository;
use Illuminate\Support\Facades\Auth;

class OrderApprovalService
{
    protected $orderApprovalRepository;


    public function __construct()
    {
        $this->orderApprovalRepository = new OrderApprovalRepository;
    }

    public function createOrderApproval($data)
    {
        $orderApproval = $this->orderApprovalRepository->createOrderApproval($data);

        return $orderApproval;
    }

    public function updateOrderApproval($id, $data)
    {
        $orderApproval = $this->orderApprovalRepository->updateOrderApproval($id, $data);

        return  $orderApproval;
    }



}
