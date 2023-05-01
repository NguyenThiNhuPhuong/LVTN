<?php

namespace App\Repositories;

use App\Models\Discounts;

class DiscountRepository
{

    protected $modelClass = Discounts::class;


    public function getAllDiscount()
    {
        return $this->modelClass::all();
    }

    public function getDiscountByDate($date)
    {
        return $this->modelClass::whereDate('expiration_date', '>=', $date)->get();
    }

    public function getDiscount($discountId)
    {
        return $this->modelClass::find($discountId);
    }

    public function createDiscount($data)
    {
        return $this->modelClass::create($data);

    }

    public function updateDiscount($id, $data)
    {
        $discount = $this->modelClass::findOrFail($id);
        $discount->update($data);
        return $discount;
    }

    public function deleteDiscount($id)
    {
        $discount = $this->modelClass::findOrFail($id);
        $discount->delete();
        return $discount;
    }
}
