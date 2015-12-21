<?php
/**
 * Created by anonymous on 18/12/15 8:34.
 */

namespace Onderdelen\JwtAuth\Repositories\User;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Collection;
use Sentinel\DataTransferObjects\BaseResponse;
use Onderdelen\JwtAuth\Models\User;

interface UserRepositoryInterface
{
    public function store($data);
}