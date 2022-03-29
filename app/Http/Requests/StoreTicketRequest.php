<?php

namespace App\Http\Requests;

use App\Enums\TicketPriority;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StoreTicketRequest extends FormRequest
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
            'title' => 'required|string',
            'description' => 'required',
            'priority' => ['required', Rule::in(TicketPriority::TYPES)],
            'category' => 'required|exists:categories,id',
            'attachments' => 'array',
            'attachments.*' => 'mimes:jpg,jpeg,gif,png,tiff,pdf,doc,docx,xls,xlsx,txt',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'mimes' => 'File format is invalid',
        ];
    }
}
