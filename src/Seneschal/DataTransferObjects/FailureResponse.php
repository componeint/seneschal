<?php
/**
 * Created by anonymous on 06/01/16 5:03.
 */

namespace Componeint\Seneschal\DataTransferObjects;

/**
 * Class FailureResponse
 * @package Componeint\Seneschal\DataTransferObjects
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
