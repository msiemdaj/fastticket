<?php

namespace App\Http\Requests;

use App\Enums\TicketPriority;
use App\Models\Ticket;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTicketRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $ticket = Ticket::findOrFail($this->route('id'));
        return $this->user()->can('update', $ticket);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string',
            'description' => 'required',
            'category' => 'required|exists:categories,id',
            'priority' => [
                'required',
                Rule::in(TicketPriority::TYPES)
            ],
        ];
    }
}
