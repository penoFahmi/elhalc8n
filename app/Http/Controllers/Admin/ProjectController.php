<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Category;
use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::with('category', 'skills')->orderBy('updated_at', 'desc');

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        $projects = $query->paginate(10)->withQueryString();

        return Inertia::render('admin/projects/Index', [
            'projects' => $projects,
            'filters' => $request->only(['search', 'status'])
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/projects/Form', [
            'project' => null,
            'categories' => Category::all(),
            'skills' => Skill::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:projects',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:draft,published',
            'repo_url' => 'nullable|url',
            'demo_url' => 'nullable|url',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']) . '-' . uniqid();
        }

        $project = Project::create($validated);

        if ($request->has('skills')) {
            $project->skills()->sync($request->skills);
        }

        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project)
    {
        $project->load('skills');
        return Inertia::render('admin/projects/Form', [
            'project' => $project,
            'categories' => Category::all(),
            'skills' => Skill::all(),
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects,slug,'.$project->id,
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:draft,published',
            'repo_url' => 'nullable|url',
            'demo_url' => 'nullable|url',
        ]);

        $project->update($validated);

        if ($request->has('skills')) {
            $project->skills()->sync($request->skills);
        }

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return redirect()->route('admin.projects.index')->with('success', 'Project deleted successfully.');
    }
}