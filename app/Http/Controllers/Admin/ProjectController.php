<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Services\ProjectService;
use App\Http\Requests\StoreProjectRequest;
use Inertia\Inertia;

class ProjectController extends Controller
{
    protected $projectService;

    // Inject ProjectService ke dalam Controller
    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    // Menampilkan halaman list project di React
    public function index()
    {
        // Ambil data project beserta relasi kategorinya
        $projects = Project::with('category')->latest()->get();
        
        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects
        ]);
    }

    // Menampilkan halaman form tambah project di React
    public function create()
    {
        // Biasanya kita butuh kirim data kategori ke form untuk dropdown
        $categories = \App\Models\Category::all();

        return Inertia::render('Admin/Projects/Create', [
            'categories' => $categories
        ]);
    }

    // Proses menyimpan data
    public function store(StoreProjectRequest $request)
    {
        // $request->validated() hanya mengambil data yang sudah lolos seleksi dari StoreProjectRequest
        $this->projectService->createProject($request->validated());

        // Redirect kembali ke halaman index
        return redirect()->route('admin.projects.index')->with('message', 'Proyek berhasil ditambahkan!');
    }
}