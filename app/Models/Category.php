<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    //
    protected $fillable = ['name', 'slug'];

    // Relasi ke tabel Projects
    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }
}
