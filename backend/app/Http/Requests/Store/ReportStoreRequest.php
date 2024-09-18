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
            'info.evidence'=> 'required|string',
            'info.lib_status_id'=> 'required|integer',
            'info.lib_category_id'=> 'required|integer',
            'location.long' => 'required|numeric|between:-90,90',
            'location.lat' => 'required|numeric|between:-180,180',
        ];
    }
}
