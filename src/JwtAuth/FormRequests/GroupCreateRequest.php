<?php
/**
 * GroupCreateRequest.php
 * Created by anonymous on 01/01/16 2:33.
 */

namespace Onderdelen\JwtAuth\FormRequests;

use Illuminate\Foundation\Http\FormRequest;

class GroupCreateRequest extends FormRequest
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
            'name' => 'required|min:4|unique:groups',
        ];
    }
}