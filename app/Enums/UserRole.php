<?php

namespace App\Enums;

class UserRole
{
    const ADMIN = 'admin';
    const WORKER = 'worker';
    const USER = 'user';

    const TYPES = [
        self::ADMIN,
        self::WORKER,
        self::USER,
    ];
}
