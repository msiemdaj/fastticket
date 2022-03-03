<?php

namespace Database\Seeders;

use App\Enums\DemoLogin;
use App\Enums\TicketStatus;
use App\Enums\UserRole;
use App\Models\Ticket;
use App\Models\User;
use App\Notifications\ReplyMessage;
use App\Notifications\TicketOpened;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */

    public function run()
    {
        \App\Models\User::create([
            'first_name' => 'Joe',
            'last_name' => 'Parker',
            'email' => DemoLogin::EMAIL,
            'role' => UserRole::ADMIN,
            'email_verified_at' => now(),
            'password' => Hash::make(DemoLogin::PASSWORD),
            'remember_token' => Str::random(10),
        ]);

        \App\Models\User::create([
            'first_name' => 'Martha',
            'last_name' => 'Davis',
            'email' => 'worker@fastticket.pl',
            'role' => UserRole::WORKER,
            'email_verified_at' => now(),
            'password' => Hash::make('fastticket'),
            'remember_token' => Str::random(10),
        ]);

        \App\Models\User::create([
            'first_name' => 'Jimmy',
            'last_name' => 'Johnson',
            'email' => 'user@fastticket.pl',
            'role' => UserRole::USER,
            'email_verified_at' => now(),
            'password' => Hash::make('fastticket'),
            'remember_token' => Str::random(10),
        ]);

        \App\Models\User::factory(15)->create();
        \App\Models\Category::factory(10)->create();
        \App\Models\Ticket::factory(100)->create();

        $this->faker = Faker::create();

        foreach (Ticket::all() as $ticket) {
            $worker_id = NULL;
            $closed_by = NULL;

            $user_id = $this->faker->randomElement(User::all()->pluck('id'));

            if ($ticket->status != TicketStatus::PENDING) {
                $worker_id = $this->faker->randomElement(User::whereIn('role', [UserRole::WORKER, UserRole::ADMIN])->pluck('id'));
            }

            if ($ticket->isClosed() || $ticket->isCompleted()) {
                $closed_by = $this->faker->randomElement(User::whereIn('id', [$user_id, $worker_id])->pluck('id'));
            }

            DB::table('ticket_user')->insert([
                'ticket_id' => $ticket->id,
                'user_id' => $user_id,
                'worker_id' => $worker_id,
                'closed_by' => $closed_by,
            ]);

            if ($ticket->status != TicketStatus::PENDING) {
                $length = $this->faker->numberBetween(1, 6);
                for ($i = 1; $i <= $length; $i++) {
                    \App\Models\Message::create([
                        'body' => $this->faker->text(100),
                        'ticket_id' => $ticket->id,
                        'user_id' => $this->faker->randomElement([$user_id, $worker_id]),
                    ]);
                }
            }

            $user = User::find(1);
            if (
                $ticket->user->first()->id == $user->id
                && $ticket != TicketStatus::PENDING
            ) {
                $user->notify(new TicketOpened($ticket));

                foreach ($ticket->messages as $message) {
                    if ($message->user_id != $user->id) {
                        $user->notify(new ReplyMessage($ticket));
                    }
                }
            }
        }
    }
}
