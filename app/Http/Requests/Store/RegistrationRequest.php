<?php

namespace App\Http\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;

class RegistrationRequest extends FormRequest
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
            'username' => 'required|string|unique:users,username',
            'password' => 'required|string|min:6|confirmed',
            'email' => 'required|string|unique:users,email',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'middle_name' => 'required|string',
            'badge_no' => 'required|string',
            'phone_no' => 'required|string',
            'location_id' => 'required|integer',
            'lib_role_id' => 'required|integer',
            'lib_gender_id' => 'required|integer',
            'lib_rank_id' => 'required|integer',
            'lib_station_id' => 'required|integer',
        ];
    }
}
