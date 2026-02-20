<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    //
    use SoftDeletes;

    protected $fillable = [
        'name', 'email', 'subject', 'message', 'is_read', 'ip_address'
    ];

    protected $casts = [
        'is_read' => 'boolean',
    ];
}
