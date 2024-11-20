<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VerifyCommunityUserRequest extends FormRequest
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
            'password' => 'sometimes|nullable|string|min:6|confirmed',
            'username' => 'sometimes|string',
            'email' => 'sometimes|string',
            'first_name' => 'sometimes|nullable|string',
            'last_name' => 'sometimes|nullable|string',
            'middle_name' => 'sometimes|nullable|string',
            'badge_no' => 'sometimes|nullable|string',
            'phone_no' => 'sometimes|nullable|string',
            'location_id' => 'required|integer',
            'lib_role_id' => 'sometimes|nullable|integer',
            'lib_gender_id' => 'required|integer',
            'lib_rank_id' => 'sometimes|nullable|integer',
            'isVerified' => 'sometimes',
            'lib_station_id' => 'sometimes|nullable|integer',
        ];
    }
}
