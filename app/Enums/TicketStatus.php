<?php

namespace App\Enums;

class TicketStatus
{
    const PENDING = 'Pending';
    const OPEN = 'Open';
    const CLOSED = 'Closed';
    const COMPLETED = 'Completed';

    const TYPES = [
        self::PENDING,
        self::OPEN,
        self::CLOSED,
        self::COMPLETED,
    ];
}
