<?php

namespace Database\Factories;

use App\Enums\TicketPriority;
use App\Enums\TicketStatus;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->paragraph(1),
            'description' => $this->faker->text(200),
            'category_id' => $this->faker->randomElement(Category::all()->pluck('id')),
            'status' => $this->faker->randomElement(TicketStatus::TYPES),
            'priority' => $this->faker->randomElement(TicketPriority::TYPES),
        ];
    }
}
