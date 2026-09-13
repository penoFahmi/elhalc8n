<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\GithubSyncController;
use App\Models\Setting;
use App\Models\Project;
use App\Models\Skill;
use App\Models\Experience;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'settings' => Setting::first(),
        'projects' => Project::with('skills')->get(),
        'skills' => Skill::all(),
        'experiences' => Experience::all(),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('projects', ProjectController::class);
    Route::post('github-sync', [GithubSyncController::class, 'sync'])->name('github.sync');
});

require __DIR__.'/settings.php';
