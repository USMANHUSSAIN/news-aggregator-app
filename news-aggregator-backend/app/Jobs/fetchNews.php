<?php

namespace App\Jobs;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class fetchNews
{
    public function __invoke() {
        DB::table('news')->truncate();
        $this->storeNYTApiHome();
        $this->storeGuardianApiHome();
        $this->storeNewsApiHeadline();
    }

    public function storeNYTApiHome()
    {
        // Construct the New York Times API URL with query parameters
        $url = 'https://api.nytimes.com/svc/topstories/v2/home.json?' . http_build_query(['api-key' => config('services.nyt_api.key')]);

        // Make the HTTP request to the New York Times API
        $response = Http::get($url);

        // Extract the filtered articles from the response
        $filteredArticles = collect($response->json('results'))->filter(function ($article) {
            return (
                $article['title'] &&
                $article['abstract'] &&
                Arr::get($article, 'multimedia.0.url') &&
                $article['url'] &&
                $article['created_date']
            );
        });

        // Map the filtered articles to the desired format
        $news = $filteredArticles->map(function ($article) {
            return [
                'title' => $article['title'],
                'source' => 'The New York Times',
                'author' => 'The New York Times',
                'news_agency' => config('services.nyt_api.slug'),
                'description' => $article['abstract'],
                'imageUrl' => Arr::get($article, 'multimedia.0.url'),
                'url' => $article['url'],
                'createdDate' => $article['created_date'],
                'category' => $article['section'],
            ];
        })->values()->all();

        News::insert($news);
    }

    public function storeGuardianApiHome()
    {
        // Construct the The Guardian API URL with query parameters
        $url = 'https://content.guardianapis.com/search?show-fields=thumbnail,trailText&page-size=150&' . http_build_query(['api-key' => config('services.guardian_api.key')]);

        // Make the HTTP request to the The Guardian API
        $response = Http::get($url);

        // Extract the filtered articles from the response
        $filteredArticles = collect($response->json('response.results'))->filter(function ($article) {
            return (
                $article['webTitle'] &&
                Arr::get($article, 'fields.trailText') &&
                $article['webUrl'] &&
                Arr::get($article, 'fields.thumbnail') &&
                $article['webPublicationDate']
            );
        });

        // Map the filtered articles to the desired format
        $news = $filteredArticles->map(function ($article) {
            return [
                'title' => $article['webTitle'],
                'source' => 'The Guardian',
                'author' => 'The Guardian',
                'news_agency' => config('services.guardian_api.slug'),
                'description' => Arr::get($article, 'fields.trailText'),
                'imageUrl' => Arr::get($article, 'fields.thumbnail'),
                'url' => $article['webUrl'],
                'createdDate' => $article['webPublicationDate'],
                'category' => $article['sectionId']
            ];
        })->values()->all();

        News::insert($news);
    }

    public function storeNewsApiHeadline()
    {
        // Construct the NewsAPI URL with query parameters
        $url = 'https://newsapi.org/v2/top-headlines?country=us&sortBy=popularity&pageSize=70&' . http_build_query(['apiKey' => config('services.news_api.key')]);

        // Make the HTTP request to the NewsAPI
        $response = Http::get($url);

        $filteredArticles = collect($response->json('articles'))->filter(function ($article) {
            return (
                Arr::get($article, 'source.name') &&
                $article['author'] &&
                $article['title'] &&
                $article['description'] &&
                $article['url'] &&
                $article['urlToImage'] &&
                $article['publishedAt']
            );
        });

        // Map the filtered articles to the desired format
        $news = $filteredArticles->map(function ($article) {
            return [
                'title' => strpos($article['title'], '-') !== false ? trim(substr($article['title'], 0, strrpos($article['title'], '-'))): $article['title'],
                'source' => 'NewsAPI',
                'author' => $article['author'],
                'news_agency' => config('services.news_api.slug'),
                'description' => $article['description'],
                'url' => $article['url'],
                'imageUrl' => $article['urlToImage'],
                'createdDate' => $article['publishedAt'],
            ];
        })->values()->all();

        News::insert($news);
    }

}
