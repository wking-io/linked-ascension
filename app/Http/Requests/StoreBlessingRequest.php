<?php

namespace App\Http\Requests;

use App\Enums\BlessingType;
use Illuminate\Foundation\Http\FormRequest;

class StoreBlessingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Assuming any authenticated user can create a blessing for now
        // Adjust authorization logic as needed
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'alpha_dash', 'max:255', 'unique:blessings'],
            'type' => ['required', 'string', 'in:' . implode(',', array_column(BlessingType::cases(), 'value'))],
            'description' => ['required', 'string'],
        ];
    }
}
