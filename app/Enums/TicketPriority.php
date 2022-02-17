<?php

namespace App\Enums;

class TicketPriority
{
    const UNASSIGNED = 'Unassigned';
    const LOW = 'Low';
    const MEDIUM = 'Medium';
    const HIGH = 'High';
    const CRITICAL = 'Critical';

    const TYPES = [
        self::UNASSIGNED,
        self::LOW,
        self::MEDIUM,
        self::HIGH,
        self::CRITICAL,
    ];
}
