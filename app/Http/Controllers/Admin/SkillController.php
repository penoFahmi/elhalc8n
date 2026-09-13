<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SkillController extends Controller
{
    public function index(Request $request)
    {
        $query = Skill::orderBy('order_number', 'asc');

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('category', 'like', "%{$search}%");
            });
        }

        $skills = $query->paginate(10)->withQueryString();

        return Inertia::render('admin/skills/Index', [
            'skills' => $skills,
            'filters' => $request->only(['search'])
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/skills/Form', [
            'skill' => null
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'percentage' => 'required|integer|min:0|max:100',
            'order_number' => 'nullable|integer',
        ]);

        if (empty($validated['order_number'])) {
            $validated['order_number'] = Skill::max('order_number') + 1;
        }

        Skill::create($validated);

        return redirect()->route('admin.skills.index')->with('success', 'Skill created successfully.');
    }

    public function edit(Skill $skill)
    {
        return Inertia::render('admin/skills/Form', [
            'skill' => $skill
        ]);
    }

    public function update(Request $request, Skill $skill)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'percentage' => 'required|integer|min:0|max:100',
            'order_number' => 'required|integer',
        ]);

        $skill->update($validated);

        return redirect()->route('admin.skills.index')->with('success', 'Skill updated successfully.');
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();
        return redirect()->route('admin.skills.index')->with('success', 'Skill deleted successfully.');
    }
}
