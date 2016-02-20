<?php
/**
 * Created by anonymous on 06/01/16 5:02.
 */

namespace Onderdelen\Seneschal\DataTransferObjects;

/**
 * Class BaseResponse
 * @package Onderdelen\Seneschal\DataTransferObjects
 */
class BaseResponse
{
    /**
     * @var array
     */
    protected $payload;
    /**
     * @var
     */
    protected $message;
    /**
     * @var
     */
    protected $success;
    /**
     * @var bool
     */
    protected $error = false;


    /**
     * @param            $message
     * @param array|null $payload
     */
    public function __construct($message, array $payload = null)
    {
        $this->message = $message;
        $this->payload = $payload;
    }

    /**
     * @return mixed
     */
    public function isSuccessful()
    {
        return $this->success;
    }

    /**
     * @return mixed
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * @return array|null
     */
    public function getPayload()
    {
        return $this->payload;
    }

    /**
     * @return bool
     */
    public function isError()
    {
        return $this->error;
    }
}
