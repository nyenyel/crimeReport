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
        $id = $this->route('user')->id;
        return [
            'username' => 'required|string|unique:users,username,'.$id,
            'password' => 'sometimes|nullable|string|min:6|confirmed',
            'email' => 'required|email|string|unique:users,email,'.$id,
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'middle_name' => 'required|string',
            'badge_no' => 'required|string',
            'phone_no' => 'required|string',
            'location_id' => 'sometimes|integer',
            'lib_role_id' => 'sometimes|integer',
            'lib_gender_id' => 'sometimes|integer',
            'lib_rank_id' => 'sometimes|integer',
            'lib_station_id' => 'sometimes|integer',
            'isVerified' => 'sometimes',
        ];
    }
}
