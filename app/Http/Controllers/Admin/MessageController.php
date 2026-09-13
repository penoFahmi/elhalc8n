<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        $messages = Message::orderBy('created_at', 'desc')->get();
        return Inertia::render('admin/messages/Index', [
            'messages' => $messages
        ]);
    }

    public function show(Message $message)
    {
        if (!$message->is_read) {
            $message->update(['is_read' => true]);
        }

        return Inertia::render('admin/messages/Show', [
            'message' => $message
        ]);
    }

    public function destroy(Message $message)
    {
        $message->delete();
        return redirect()->route('admin.messages.index')->with('success', 'Message deleted successfully.');
    }
}
