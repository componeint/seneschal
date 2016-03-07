<?php
/**
 * ChangePasswordRequest.php
 * Created by anonymous on 01/01/16 1:25.
 */

namespace Componeint\Seneschal\FormRequests;

use Illuminate\Foundation\Http\FormRequest;

class ChangePasswordRequest extends FormRequest
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
        return [
            'oldPassword'              => 'min:8',
            'newPassword'              => 'required|min:8|confirmed',
            'newPassword_confirmation' => 'required',
        ];
    }
}

