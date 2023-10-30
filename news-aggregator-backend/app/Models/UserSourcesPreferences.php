<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSourcesPreferences extends Model
{
    use HasFactory;

    protected $table = 'user_sources_preferences';

    protected $fillable = [
        'user_id',
        'value',
        'label'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
