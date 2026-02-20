<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    //
    protected $fillable = [
        'name', 'category', 'percentage', 'icon_url', 'order_number'
    ];

    // Relasi ke tabel Projects melalui tabel pivot project_skill
    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class);
    }
}
