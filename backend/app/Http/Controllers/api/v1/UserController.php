<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Update\UserUpdateRequest;
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
        $user->update($request->validated());
        $user->load($this->relation);
        return UserResource::make($user);
    }

}
