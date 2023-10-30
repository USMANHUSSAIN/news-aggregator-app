<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    protected $table = 'news';

    protected $fillable = [
        'title',
        'source',
        'author',
        'news_agency',
        'description',
        'image_url',
        'url',
        'created_date',
        'category'
    ];
}
