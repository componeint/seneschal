<?php
/**
 * ResetPasswordRequest.php
 * Created by anonymous on 01/01/16 2:45.
 */

namespace Onderdelen\Seneschal\FormRequests;

use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
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
            'password' => 'required|min:8|confirmed',
        ];
    }
}