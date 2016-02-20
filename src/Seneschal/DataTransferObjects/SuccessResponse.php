<?php
/**
 * Created by anonymous on 06/01/16 5:03.
 */

namespace Onderdelen\Seneschal\DataTransferObjects;

/**
 * Class SuccessResponse
 * @package Onderdelen\Seneschal\DataTransferObjects
 */
class SuccessResponse extends BaseResponse
{
    /**
     * @param            $message
     * @param array|null $payload
     */
    public function __construct($message, array $payload = null)
    {
        parent::__construct($message, $payload);

        $this->success = true;
    }
}
