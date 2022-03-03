<?php

namespace App\Enums;

class DemoLogin
{
    const EMAIL = 'admin@fastticket.pl';
    const PASSWORD = 'fastticket';

    const TYPES = [
        'email' => self::EMAIL,
        'password' => self::PASSWORD,
    ];
}
