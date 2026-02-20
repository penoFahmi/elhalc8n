<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    //
    use SoftDeletes; // Aktifkan fitur soft delete

    protected $fillable = [
        'category_id', 'title', 'slug', 'content', 
        'thumbnail_url', 'demo_url', 'repo_url', 
        'status', 'published_at'
    ];

    // Format tanggal otomatis
    protected $casts = [
        'published_at' => 'datetime',
    ];

    // Relasi balik ke Category
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    // Relasi ke tabel Skills
    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class);
    }
}
