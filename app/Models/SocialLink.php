<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocialLink extends Model
{
    //
    protected $fillable = [
        'platform', 'url', 'icon_class', 'is_active', 'order_number'
    ];

    // Cast is_active agar otomatis menjadi boolean (true/false) saat diambil API
    protected $casts = [
        'is_active' => 'boolean',
    ];
}
