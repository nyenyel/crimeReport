<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommunityAccountRegisterRequest extends FormRequest
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
            'first_name' => 'sometimes|nullable|string',
            'last_name' => 'sometimes|nullable|string',
            'middle_name' => 'sometimes|nullable|string',
            'badge_no' => 'sometimes|nullable|string',
            'phone_no' => 'sometimes|nullable|string',
            'location_id' => 'required|integer',
            'lib_role_id' => 'sometimes|nullable|integer',
            'lib_gender_id' => 'required|integer',
            'lib_rank_id' => 'sometimes|nullable|integer',
            'lib_station_id' => 'sometimes|nullable|integer',
        ];
    }
}
