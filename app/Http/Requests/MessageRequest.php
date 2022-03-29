<?php

namespace App\Http\Requests;

use App\Models\Ticket;
use Illuminate\Foundation\Http\FormRequest;

class MessageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $ticket = Ticket::findOrFail($this->route('id'));
        return $this->user()->can('create', [Message::class, $ticket]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'message' => 'required',
        ];
    }
}
