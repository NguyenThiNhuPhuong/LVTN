<?php

namespace App\Repositories;

use App\Models\Discounts;

class DiscountRepository
{

    protected $modelClass = Discounts::class;
    protected $perPage =12;

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

    public function updatePurchaseCurrent($id, $purchaseCurrent)
    {
        $discount = $this->modelClass::findOrFail($id);
        $discount->update([
            'purchase_current' => $purchaseCurrent
        ]);
        return $discount;
    }

    public function getDiscountByCode($discount_code)
    {
        return $this->modelClass::where('code', $discount_code)->first();
    }

    public function getDiscountValid($dateTime, $priceProduct)
    {
        return $this->modelClass::where('expiration_date', '>=', $dateTime)
            ->where('minium_order', '<=', $priceProduct)
            ->get()->toArray();
    }
}
