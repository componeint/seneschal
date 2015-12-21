<?php
/**
 * Created by anonymous on 18/12/15 8:35.
 */

namespace Onderdelen\JwtAuth\Repositories\User;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\UserProvider;
use Onderdelen\JwtAuth\Models\User;
use Sentinel\Repositories\User\SentryUserRepository;

class UserRepository extends SentryUserRepository implements UserRepositoryInterface, UserProvider
{
    public function store($data)
    {
        parent::store($data);
    }
}

