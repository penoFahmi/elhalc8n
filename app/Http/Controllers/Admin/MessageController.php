<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index(Request $request)
    {
        $query = Message::orderBy('created_at', 'desc');

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('subject', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            if ($request->input('status') === 'unread') {
                $query->where('is_read', false);
            } elseif ($request->input('status') === 'read') {
                $query->where('is_read', true);
            }
        }

        $messages = $query->paginate(10)->withQueryString();

        return Inertia::render('admin/messages/Index', [
            'messages' => $messages,
            'filters' => $request->only(['search', 'status'])
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
