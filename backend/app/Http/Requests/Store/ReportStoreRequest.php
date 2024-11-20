<?php

namespace App\Http\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;

class ReportStoreRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'info.title' => 'required|string',
            'info.desc'=> 'required|string',
            'info.reporter_name'=> 'required|string',
            'info.reporter_account'=> 'sometimes|integer|nullable',
            'info.dispatch_user'=> 'sometimes|integer|nullable',
            'info.address' => 'required|string',
            'info.lib_status_id'=> 'required|integer',
            'info.category'=> 'required|string',
            'location.long' => 'required|numeric',
            'location.lat' => 'required|numeric',
        ];
    }
}
