<?php

namespace App\Http\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;

class StationStoreRequest extends FormRequest
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
            'info.address' => 'required',
            'info.lib_station_status_id' => 'required|integer',
            'location.long' => 'required|numeric',
            'location.lat' => 'required|numeric'
        ];
    }
}
