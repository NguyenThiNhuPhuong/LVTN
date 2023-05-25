<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FeedbackRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function addRules(): array
    {
        return [
            'email' => 'required|email',
            'content' => 'required|string',
        ];

    }



    public function rules(): array
    {

        if ($this->isMethod('post')) {
            return $this->addRules();
        } elseif ($this->isMethod('put')) {
            return $this->updateRules($this->route('feedback'));
        }
        return [];
    }
}
