<?php

namespace App\Models;

use App\Enums\TicketStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'user_id',
        'category_id',
        'status',
        'priority',
        'attachments',
    ];

    public function user()
    {
        return $this->belongsToMany(User::class, 'ticket_user', 'ticket_id', 'user_id');
    }

    public function worker()
    {
        return $this->belongsToMany(User::class, 'ticket_user', 'ticket_id', 'worker_id');
    }

    public function category()
    {
        return $this->belongsTo('App\Models\Category');
    }

    public function isClosed()
    {
        return $this->status == TicketStatus::CLOSED;
    }

    public function isOpen()
    {
        return $this->status == TicketStatus::OPEN;
    }
}
