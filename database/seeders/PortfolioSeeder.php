<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Setting;
use App\Models\SocialLink;
use App\Models\Category;
use App\Models\Skill;
use App\Models\Project;
use App\Models\Experience;

class PortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Settings
        Setting::create([
            'site_title' => 'Elhalc8n Space',
            'hero_title' => 'Hi, I am Peno Fahmi.',
            'about_text' => 'A passionate software engineer specializing in modern web development.',
            'meta_title' => 'Peno Fahmi | Portfolio',
            'meta_description' => 'Explore the projects and experiments of Peno Fahmi (Elhalc8n).',
        ]);

        // 2. Social Links
        SocialLink::create(['platform' => 'GitHub', 'url' => 'https://github.com/penoFahmi', 'order_number' => 1]);
        SocialLink::create(['platform' => 'LinkedIn', 'url' => 'https://linkedin.com/in/penofahmi', 'order_number' => 2]);

        // 3. Categories
        $catWeb = Category::create(['name' => 'Web Development', 'slug' => 'web-development']);
        $catExp = Category::create(['name' => 'Experiments', 'slug' => 'experiments']);

        // 4. Skills
        $skillLaravel = Skill::create(['name' => 'Laravel 13', 'category' => 'Backend', 'percentage' => 90, 'order_number' => 1]);
        $skillReact = Skill::create(['name' => 'React 19', 'category' => 'Frontend', 'percentage' => 85, 'order_number' => 2]);
        $skillTailwind = Skill::create(['name' => 'Tailwind CSS v4', 'category' => 'Frontend', 'percentage' => 95, 'order_number' => 3]);

        // 5. Experiences
        Experience::create([
            'type' => 'work',
            'title' => 'Software Engineer',
            'institution' => 'Elhalc8n Studio',
            'start_date' => '2023-01-01',
            'description' => 'Developing modern web applications using Laravel and React.',
            'order_number' => 1
        ]);

        // 6. Projects
        $project1 = Project::create([
            'category_id' => $catWeb->id,
            'title' => 'Elhalc8n Space',
            'slug' => 'elhalc8n-space',
            'content' => 'The personal portfolio website of Peno Fahmi.',
            'status' => 'published',
            'published_at' => now(),
        ]);
        $project1->skills()->attach([$skillLaravel->id, $skillReact->id, $skillTailwind->id]);
    }
}
