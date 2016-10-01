<?php
/**
 * SuccessResponse.php
 * Created by @anonymoussc on 06/01/16 5:03.
 */

namespace Componeint\Seneschal\DataTransferObjects;

/**
 * Class SuccessResponse
 * @package Componeint\Seneschal\DataTransferObjects
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
