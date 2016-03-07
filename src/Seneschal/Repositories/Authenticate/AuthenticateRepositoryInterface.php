<?php
/**
 * AuthenticateRepositoryInterface.php
 * Created by anonymous on 05/01/16 17:57.
 */

namespace Componeint\Seneschal\Repositories\Authenticate;

use Componeint\Seneschal\DataTransferObjects\BaseResponse;

/**
 * Interface AuthenticateRepositoryInterface
 * @package Componeint\Seneschal\Repositories\Authenticate
 */
interface AuthenticateRepositoryInterface
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