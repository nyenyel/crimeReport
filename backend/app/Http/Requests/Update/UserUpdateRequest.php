<?php

namespace App\Http\Requests\Update;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
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
            'username' => 'sometimes|string|unique:users,username',
            'password' => 'sometimes|string|min:6',
            'email' => 'sometimes|string|unique:users,email',
            'first_name' => 'sometimes|string',
            'last_name' => 'sometimes|string',
            'middle_name' => 'sometimes|string',
            'badge_no' => 'sometimes|string',
            'phone_no' => 'sometimes|string',
            'location_id' => 'sometimes|integer',
            'lib_role_id' => 'sometimes|integer',
            'lib_gender_id' => 'sometimes|integer',
            'lib_rank_id' => 'sometimes|integer',
            'lib_station_id' => 'sometimes|integer',
        ];
    }
}
