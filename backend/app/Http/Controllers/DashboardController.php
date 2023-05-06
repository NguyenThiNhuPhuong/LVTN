<?php

namespace App\Http\Controllers;

use App\Repositories\CategoryRepository;
use App\Repositories\DiscountRepository;
use App\Repositories\OrderDetailRepository;
use App\Repositories\SliderRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    protected $categoryRepository;
    protected $orderDetailRepository;
    protected $sliderRepository;
    protected $userRepository;
    protected $discountRepository;

    public function __construct()
    {
        $this->categoryRepository = new CategoryRepository;
        $this->orderDetailRepository = new OrderDetailRepository;
        $this->sliderRepository = new SliderRepository;
        $this->userRepository = new UserRepository;
        $this->discountRepository = new DiscountRepository;
    }

    public function listTotalItem()
    {
        $uers = $this->userRepository->getAll();
        $category = $this->categoryRepository->getAll();
        $order = $this->orderDetailRepository->getAll();
        $slider = $this->sliderRepository->getAll();
        $discount = $this->discountRepository->getAll();

        return response()->json([
            'user' => count($uers),
            'category' => count($category),
            'order' => count($order),
            'slider' => count($slider),
            'discount' => count($discount),
        ]);
    }
}
