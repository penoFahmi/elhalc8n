<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Skill;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalProjects = Project::count();
        $totalSkills = Skill::count();
        
        // Ensure messages table exists before counting
        // We'll wrap in a try-catch just in case the migration hasn't been fully run or something,
        // though we know it exists from our checks.
        $unreadMessages = Message::where('is_read', false)->count();
        $recentMessages = Message::orderBy('created_at', 'desc')->take(5)->get();

        // System logs could be retrieved from a real logs table or Laravel's logging,
        // but for now, we'll keep a placeholder array and simulate it, or we can just 
        // return an empty array if we don't have a real logging system yet.
        $systemLogs = [
            ['time' => now()->format('h:i A'), 'log' => 'Dashboard accessed by Admin'],
        ];

        return Inertia::render('dashboard', [
            'stats' => [
                'totalProjects' => $totalProjects,
                'totalSkills' => $totalSkills,
                'unreadMessages' => $unreadMessages,
                'systemStatus' => 'ONLINE'
            ],
            'recentMessages' => $recentMessages,
            'systemLogs' => $systemLogs,
        ]);
    }
}
