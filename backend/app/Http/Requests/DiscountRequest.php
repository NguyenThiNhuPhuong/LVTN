<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DiscountRequest extends FormRequest
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
            'code' => 'required|string|max:255|unique:discounts',
            'discount' => 'required',
            'minium_order' => 'required',
            'purchase_limit' => 'nullable',
            'expiration_date' => 'required|date',
            'description' => 'nullable|string',
        ];

    }

    public function updateRules($id): array
    {

        return [
            'code' => [
                'required',
                'string',
                'max:255',
                Rule::unique('discounts')->ignore($id),
            ],
            'discount' => 'required',
            'minium_order' => 'required',
            'purchase_limit' => 'nullable',
            'expiration_date' => 'required|date',
            'description' => 'nullable|string',
        ];
    }

    public function rules(): array
    {

        if ($this->isMethod('post')) {
            return $this->addRules();
        } elseif ($this->isMethod('put')) {
            return $this->updateRules($this->route('discount'));
        }
        return [];
    }
}
