<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SliderRequest extends FormRequest
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
        return  [
            'name' => 'required|string|max:255|unique:sliders',
            'link' => 'nullable|string',
            'file' => 'required|image',
        ];

    }

    public function updateRules($id): array
    {

        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('sliders')->ignore($id),
            ],
            'link' => 'nullable|string',
            'file' => 'image',
        ];
    }

    public function rules(): array
    {
        if ($this->isMethod('post')) {
            return $this->addRules();
        } elseif ($this->isMethod('put')) {
            return $this->updateRules($this->route('slider'));
        }
        return [];
    }

}
