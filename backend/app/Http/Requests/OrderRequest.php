<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class OrderRequest extends FormRequest
{

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     *
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function addRules(): array
    {
        return [
            'name' => 'required',
            'email' => 'email',
            'phone' => 'required',
            'cart' => 'required',
            'discount_id' => [
                Rule::exists('discounts', 'id'),
            ],
            'province_id' => [
                'required',
                Rule::exists('provinces', 'id'),
            ],
            'district_id' => [
                'required',
                Rule::exists('districts', 'id'),
            ],
            'ward_id' => [
                'required',
                Rule::exists('wards', 'id'),
            ],
            'address' => 'required',
            'price_all' => 'required',
            'price_product' => 'required',
            'price_ship' => 'required',
        ];

    }

    public function updateRules($id): array
    {

        return [
            'name' => 'required',
            'email' => 'email',
            'phone' => 'required',
            'cart' => 'required',
            'province_id' => 'required',
            'district_id' => 'required',
            'ward_id' => 'required',
            'address' => 'required',
            'price_all' => 'required',
            'price_product' => 'required',
            'price_ship' => 'required',
        ];
    }

    public function rules(): array
    {

        if ($this->isMethod('post')) {
            return $this->addRules();
        } elseif ($this->isMethod('put')) {
            return $this->updateRules($this->route('category'));
        }
        return [];
    }

}
