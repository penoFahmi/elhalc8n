<?php

namespace App\Services;

use App\Models\Project;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProjectService
{
    public function createProject(array $data)
    {
        // 1. Generate slug otomatis dari judul
        // Contoh saat kamu input: "SPK Servis Komputer Web GIS" -> otomatis jadi "spk-servis-komputer-web-gis"
        $data['slug'] = Str::slug($data['title']);

        // 2. Logika Upload Gambar
        if (isset($data['thumbnail'])) {
            // Simpan gambar ke folder storage/app/public/projects
            $data['thumbnail_url'] = $data['thumbnail']->store('projects', 'public');
        }

        // 3. Atur tanggal publish jika statusnya published
        if ($data['status'] === 'published') {
            $data['published_at'] = now();
        }

        // 4. Simpan ke database
        return Project::create($data);
    }
}