<?php
/**
 * Created by anonymous on 05/01/16 17:57.
 */

namespace Onderdelen\JwtAuth\Repositories\Authenticate;

use Sentinel\DataTransferObjects\BaseResponse;

/**
 * Interface AuthenticateRepostitoryInterface
 * @package Onderdelen\JwtAuth\Repositories\Authenticate
 */
interface AuthenticateRepostitoryInterface
{
    /**
     * @param $data
     * @return mixed
     */
    public function store($data);

    /**
     * @return mixed
     */
    public function destroy();
}