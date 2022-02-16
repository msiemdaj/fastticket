<?php

namespace App\Enums;

class UserRole
{
    const USER = 'user';
    const WORKER = 'worker';
    const ADMIN = 'admin';

    const TYPES = [
        self::USER,
        self::WORKER,
        self::ADMIN,
    ];
}
