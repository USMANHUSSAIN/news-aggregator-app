<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Arr;
use Illuminate\Database\Eloquent\Collection;

class NewsController extends Controller
{
    public function fetchNYTApiHome()
    {
        $news = News::where('news_agency', config('services.nyt_api.slug'))->get();

        if(count($news) > 0) {
            return $news;
        }

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
                'description' => $article['abstract'],
                'imageUrl' => Arr::get($article, 'multimedia.0.url'),
                'url' => $article['url'],
                'createdDate' => $article['created_date'],
                'category' => $article['section'],
            ];
        });

        // Return the filtered and mapped articles
        return response()->json($news);
    }

    public function fetchNYTApiFilter(Request $request)
    {
        // Get the section from the request query parameter
        $section = $request->query('section');

        // Get the article search query from the request query parameter
        $searchQuery = $request->query('q');

        // Get the from-date and to-date from the request query parameters
        $fromDate = $request->query('from-date');
        $toDate = $request->query('to-date');

        // Construct the New York Times API URL with query parameters
        $url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?' . http_build_query([
                'api-key' => config('services.nyt_api.key'),
                'section_name' => $section,
                'q' => $searchQuery,
                'begin_date' => $fromDate,
                'end_date' => $toDate,
                'page' => 0, // Specify the page number (0 for the first page)
                'page-size' => 20, // Set the page size to 20
            ]);

        // Make the HTTP request to the New York Times API
        $response = Http::get($url);

        // Extract only the necessary fields from the API response
        $articles = $response->json()['response']['docs'] ?? [];

        $results = [];
        foreach ($articles as $article) {
            $multimedia = $article['multimedia'][0] ?? null; // Assuming the first multimedia item is the thumbnail

            $thumbnail = null;
            if ($multimedia && isset($multimedia['url'])) {
                $baseURL = 'https://www.nytimes.com/';
                $thumbnail = $baseURL . $multimedia['url'];
            }

            // Check if thumbnail exists and is not empty
            if ($thumbnail && $thumbnail !== "") {
                $result = [
                    'title' => $article['headline']['main'],
                    'description' => $article['abstract'],
                    'source' => $article['source'],
                    'author' => $article['source'],
                    'url' => $article['web_url'],
                    'createdDate' => $article['pub_date'],
                    'imageUrl' => $thumbnail,
                ];
                $results[] = $result;
            }
        }

        return $results;
    }

    public function fetchGuardianApiHome(Request $request)
    {
        $news = News::where('news_agency', config('services.guardian_api.slug'))->get();

        if(count($news) > 0) {
            return $news;
        }

        $query = $request->query();

        // Construct the The Guardian API URL with query parameters
        $url = 'https://content.guardianapis.com/search?show-fields=thumbnail,trailText&page-size=150&' . http_build_query($query + ['api-key' => config('services.guardian_api.key')]);

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
                'description' => Arr::get($article, 'fields.trailText'),
                'imageUrl' => Arr::get($article, 'fields.thumbnail'),
                'url' => $article['webUrl'],
                'createdDate' => $article['webPublicationDate'],
                'category' => $article['sectionId']
            ];
        })->values()->all();

        // Return the filtered and mapped articles
        return response()->json($news);
    }

    public function fetchGuardianApiFilter(Request $request)
    {
        $query = $request->query();

        // Construct the The Guardian API URL with query parameters
        $url = 'https://content.guardianapis.com/search?show-fields=thumbnail,trailText&page-size=20&' . http_build_query($query + ['api-key' => config('services.guardian_api.key')]);

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
                'description' => Arr::get($article, 'fields.trailText'),
                'imageUrl' => Arr::get($article, 'fields.thumbnail'),
                'url' => $article['webUrl'],
                'createdDate' => $article['webPublicationDate'],
            ];
        })->values()->all();

        // Return the filtered and mapped articles
        return response()->json($news);
    }

    public function fetchNewsApiHeadline(Request $request)
    {
        $news = News::where('news_agency', config('services.news_api.slug'))->get();

        if(count($news) > 0) {
            return $news;
        }

        $query = $request->query();

        // Construct the NewsAPI URL with query parameters
        $url = 'https://newsapi.org/v2/top-headlines?country=us&sortBy=popularity&pageSize=70&' . http_build_query($query + ['apiKey' => config('services.news_api.key')]);

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
                'description' => $article['description'],
                'url' => $article['url'],
                'imageUrl' => $article['urlToImage'],
                'createdDate' => $article['publishedAt'],
            ];
        })->values()->all();

        // Return the filtered and mapped articles
        return $news;
    }

    public function fetchNewsApiFilter(Request $request)
    {
        $query = $request->query();

        // Construct the NewsAPI URL with query parameters
        $url = 'https://newsapi.org/v2/everything?' . http_build_query($query + ['apiKey' => config('services.news_api.key')]);

        // Make the HTTP request to the NewsAPI
        $response = Http::get($url);

        // Extract the filtered articles from the response
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
                'description' => $article['description'],
                'url' => $article['url'],
                'imageUrl' => $article['urlToImage'],
                'createdDate' => $article['publishedAt'],
            ];
        })->slice(0, 20)->values()->all();

        // Return the filtered and mapped articles
        return $news;
    }

}
