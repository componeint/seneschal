<?php
/**
 * ExceptionResponse.php
 * Created by @anonymoussc on 06/01/16 5:02.
 */

namespace Componeint\Seneschal\DataTransferObjects;

/**
 * Class ExceptionResponse
 * @package Componeint\Seneschal\DataTransferObjects
 */
class ExceptionResponse extends BaseResponse
{
    /**
     * @param            $message
     * @param array|null $payload
     */
    public function __construct($message, array $payload = null)
    {
        parent::__construct($message, $payload);

        $this->success = false;
        $this->error   = true;
    }
}
