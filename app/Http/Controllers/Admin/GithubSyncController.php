<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Skill;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class GithubSyncController extends Controller
{
    public function sync(Request $request)
    {
        $username = 'penoFahmi';
        $groqApiKey = env('GROQ_API_KEY');

        if (!$groqApiKey) {
            return redirect()->back()->with('error', 'GROQ_API_KEY is missing in .env file.');
        }

        // Fetch Repositories
        $response = Http::withHeaders([
            'User-Agent' => 'Elhalc8n-OS'
        ])->get("https://api.github.com/users/{$username}/repos?sort=updated&per_page=10");

        if (!$response->successful()) {
            return redirect()->back()->with('error', 'Failed to fetch GitHub repositories.');
        }

        $repos = $response->json();
        $syncedCount = 0;

        // Make sure a default category exists for synced projects
        $category = Category::firstOrCreate(['slug' => 'open-source'], ['name' => 'Open Source']);

        foreach ($repos as $repo) {
            // Check if project already exists
            $exists = Project::where('repo_url', $repo['html_url'])->exists();
            
            if (!$exists) {
                // Fetch README
                $readmeContent = '';
                $readmeResponse = Http::withHeaders([
                    'User-Agent' => 'Elhalc8n-OS',
                    'Accept' => 'application/vnd.github.v3.raw'
                ])->get("https://api.github.com/repos/{$username}/{$repo['name']}/readme");

                if ($readmeResponse->successful()) {
                    $readmeContent = $readmeResponse->body();
                }

                // AI Summarization using Groq
                $prompt = "Berikut adalah file README dari repositori GitHub '{$repo['name']}'. 
Tugasmu:
1. Buatkan rangkuman deskripsi proyek (2-3 kalimat) dalam bahasa Indonesia.
2. Identifikasi maksimal 5 teknologi/bahasa utama yang digunakan (pisahkan dengan koma).
Format balasan harus persis seperti ini:
DESKRIPSI: <deskripsi>
SKILLS: <skill1, skill2, ...>

README:
" . substr($readmeContent, 0, 3000); // Batasi panjang agar tidak melebihi context window

                $aiResponse = Http::withToken($groqApiKey)
                    ->post('https://api.groq.com/openai/v1/chat/completions', [
                        'model' => 'llama3-8b-8192',
                        'messages' => [
                            ['role' => 'system', 'content' => 'Kamu adalah asisten pengembang ahli yang dapat merangkum repositori GitHub.'],
                            ['role' => 'user', 'content' => $prompt]
                        ],
                        'temperature' => 0.3
                    ]);

                $description = $repo['description'] ?? 'No description provided.';
                $skillsList = [];

                if ($aiResponse->successful()) {
                    $aiText = $aiResponse->json('choices.0.message.content');
                    
                    if (preg_match('/DESKRIPSI:\s*(.+)/', $aiText, $descMatches)) {
                        $description = trim($descMatches[1]);
                    }
                    if (preg_match('/SKILLS:\s*(.+)/', $aiText, $skillMatches)) {
                        $skillsStr = str_replace('>', '', trim($skillMatches[1]));
                        $skillsList = array_map('trim', explode(',', $skillsStr));
                    }
                }

                // Create Project
                $project = Project::create([
                    'category_id' => $category->id,
                    'title' => str_replace('-', ' ', Str::title($repo['name'])),
                    'slug' => Str::slug($repo['name']) . '-' . uniqid(),
                    'content' => $description,
                    'repo_url' => $repo['html_url'],
                    'demo_url' => $repo['homepage'] ?? null,
                    'status' => 'draft',
                ]);

                // Sync Skills
                $skillIds = [];
                foreach ($skillsList as $skillName) {
                    if (!empty($skillName)) {
                        $skill = Skill::firstOrCreate(
                            ['name' => $skillName],
                            ['category' => 'Synced', 'percentage' => 50, 'order_number' => 0]
                        );
                        $skillIds[] = $skill->id;
                    }
                }
                
                if (!empty($skillIds)) {
                    $project->skills()->sync($skillIds);
                }

                $syncedCount++;
            }
        }

        return redirect()->back()->with('success', "Berhasil sinkronisasi {$syncedCount} proyek baru dari GitHub menggunakan AI!");
    }
}
