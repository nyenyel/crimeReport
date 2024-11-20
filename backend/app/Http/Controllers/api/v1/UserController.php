<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommunityAccountRegisterRequest;
use App\Http\Requests\Update\UserUpdateRequest;
use App\Http\Requests\VerifyCommunityUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use PHPUnit\Metadata\Uses;

class UserController extends Controller
{
    protected $relation = [
        'location',
        'role',
        'gender',
        'station',
        'rank'
    ];
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = User::all();
        $data->load($this->relation);
        return UserResource::collection($data);
    }


    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $user->load($this->relation);
        return UserResource::make($user);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(UserUpdateRequest $request, User $user)
    {
        $data = $request->validated();

        // Check if a new password is provided
        if (!empty($data['password'])) {
            $data['password'] = bcrypt($data['password']); // Hash the new password
        } else {
            unset($data['password']); // Remove password from the update if it's not being changed
        }

        $user->update($data);
        $user->load($this->relation);

        return response()->json(['res' => 'User updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['message' => 'Data Deleted']);
    }
    public function getPNP()
    {
        $data = User::where('lib_role_id', 2)->where('isVerified', true)->get();
        $data->load($this->relation);
        return UserResource::collection($data);
    }

    public function communityUser(VerifyCommunityUserRequest $request, User $user)
    {
        $data = $request->validated();

        // Check if a new password is provided
        if (!empty($data['password'])) {
            $data['password'] = bcrypt($data['password']); // Hash the new password
        } else {
            unset($data['password']); // Remove password from the update if it's not being changed
        }
    
        $user->update($data);
        $user->load($this->relation);
    
        return response()->json(['res' => 'User updated successfully']);
    }
}
