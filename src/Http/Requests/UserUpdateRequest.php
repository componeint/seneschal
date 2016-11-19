<?php
/**
 * UserUpdateRequest.php
 * Created by @anonymoussc on 01/01/16 2:50.
 */

namespace Componeint\Seneschal\FormRequests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return config('seneschal.additional_user_fields');
    }
}