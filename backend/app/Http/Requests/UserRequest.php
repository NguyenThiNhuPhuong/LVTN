<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
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
            'name' => 'required|string',
            'email' => 'required|string|email|max:100|unique:users',
            'type' => [
                'required',
                Rule::exists('user_type', 'id'),
            ],
            'province_id' => [
                Rule::exists('provinces', 'id'),
            ],
            'district_id' => [

                Rule::exists('districts', 'id'),
            ],
            'ward_id' => [
                Rule::exists('wards', 'id'),
            ],
            'password' => 'required|string|min:6',
            'confirmPassword'=> 'required|string|same:password|min:6',
        ];

    }

    public function updateRules($id): array
    {

        return [
            'name' => 'required|string',
            'type' => [
                'required',
                Rule::exists('user_type', 'id'),
            ],
            'province_id' => [
                Rule::exists('provinces', 'id'),
            ],
            'district_id' => [

                Rule::exists('districts', 'id'),
            ],
            'ward_id' => [
                Rule::exists('wards', 'id'),
            ],
           'file'=>'image',
        ];
    }

    public function rules(): array
    {

        if ($this->isMethod('post')) {
            return $this->addRules();
        } elseif ($this->isMethod('put')) {
            return $this->updateRules($this->route('user'));
        }
        return [];
    }

}
