<?php
/**
 * Created by anonymous on 06/01/16 5:02.
 */

namespace Onderdelen\Seneschal\DataTransferObjects;

/**
 * Class ExceptionResponse
 * @package Onderdelen\Seneschal\DataTransferObjects
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
