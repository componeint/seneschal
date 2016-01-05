<?php

namespace Onderdelen\JwtAuth\DataTransferObjects;

/**
 * Class FailureResponse
 * @package Onderdelen\JwtAuth\DataTransferObjects
 */
class FailureResponse extends BaseResponse
{
    /**
     * @param            $message
     * @param array|null $payload
     */
    public function __construct($message, array $payload = null)
    {
        parent::__construct($message, $payload);

        $this->success = false;
    }
}
