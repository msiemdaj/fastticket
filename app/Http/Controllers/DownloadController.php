<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use ZipArchive;

class DownloadController extends Controller
{
    public function download($id)
    {
        $ticket = Ticket::findOrFail($id);
        $this->authorize('download', $ticket);

        $attachments = json_decode($ticket->attachments);
        $zip = new ZipArchive;
        $zipName = 'attachments.zip';

        if ($zip->open(public_path($zipName), ZipArchive::CREATE) === TRUE) {
            foreach ($attachments as $attachment) {
                $filePath = public_path('storage/' . $attachment);
                if (File::exists($filePath)) {
                    $zip->addFile($filePath, basename($attachment));
                }
            }
            $zip->close();
        }

        if (File::exists(public_path($zipName))) {
            return response()->download(public_path($zipName))->deleteFileAfterSend(true);
        } else {
            echo ('File not found.');
        }
    }
}
