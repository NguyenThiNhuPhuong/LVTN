<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductRequest extends FormRequest
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
            'category_id' => [
                'required',
                Rule::exists('categories', 'id'),
            ],
            'name' => 'required|string|max:255|unique:products',
            'description' => 'required',
            'num' => 'required',
            'price_sale' => 'nullable',
            'price' => 'required',
            'files' => 'required|array'
        ];

    }

    public function updateRules($id): array
    {
        return [
            'category_id' => [
                'required',
                Rule::exists('categories', 'id'),
            ],
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('products')->ignore($id),
            ],
            'description' => 'required',
            'price_sale' => 'nullable',
            'price' => 'required',
            'files' => 'array'
        ];
    }

    public function rules(): array
    {

        if ($this->isMethod('post')) {
            return $this->addRules();
        } elseif ($this->isMethod('put')) {
            return $this->updateRules($this->route('product'));
        }
        return [];
    }

}
