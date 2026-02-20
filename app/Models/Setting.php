<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    //
    protected $fillable = [
        'site_title', 'hero_title', 'about_text', 
        'avatar_url', 'cv_url', 'meta_title', 'meta_description'
    ];
}
