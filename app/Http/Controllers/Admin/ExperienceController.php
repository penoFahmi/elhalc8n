<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    public function index()
    {
        $experiences = Experience::orderBy('order_number', 'asc')->get();
        return Inertia::render('admin/experiences/Index', [
            'experiences' => $experiences
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/experiences/Form', [
            'experience' => null
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'institution' => 'required|string|max:255',
            'type' => 'required|in:work,education',
            'start_date' => 'required|string',
            'end_date' => 'nullable|string',
            'description' => 'nullable|string',
            'order_number' => 'nullable|integer',
        ]);

        if (empty($validated['order_number'])) {
            $validated['order_number'] = Experience::max('order_number') + 1;
        }

        Experience::create($validated);

        return redirect()->route('admin.experiences.index')->with('success', 'Experience created successfully.');
    }

    public function edit(Experience $experience)
    {
        return Inertia::render('admin/experiences/Form', [
            'experience' => $experience
        ]);
    }

    public function update(Request $request, Experience $experience)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'institution' => 'required|string|max:255',
            'type' => 'required|in:work,education',
            'start_date' => 'required|string',
            'end_date' => 'nullable|string',
            'description' => 'nullable|string',
            'order_number' => 'required|integer',
        ]);

        $experience->update($validated);

        return redirect()->route('admin.experiences.index')->with('success', 'Experience updated successfully.');
    }

    public function destroy(Experience $experience)
    {
        $experience->delete();
        return redirect()->route('admin.experiences.index')->with('success', 'Experience deleted successfully.');
    }
}
