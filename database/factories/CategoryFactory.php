<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => str_replace('.', '', $this->faker->sentence(2)),
            'description' => $this->faker->text(150),
        ];
    }
}
