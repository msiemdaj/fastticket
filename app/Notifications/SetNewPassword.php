<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Auth\Notifications\ResetPassword as ResetPasswordNotification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Lang;

class SetNewPassword extends ResetPasswordNotification implements ShouldQueue
{
    use Queueable;

    /**
     * Get the reset password notification mail message for the given URL.
     *
     * @param  string  $url
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    protected function buildMailMessage($url)
    {
        return (new MailMessage)
            ->subject(Lang::get('Set new password'))
            ->line(Lang::get('Your account has been successfully registered. To start using it please click button below in order to change your password and login.'))
            ->action(Lang::get('Set new password'), $url);
    }
}
