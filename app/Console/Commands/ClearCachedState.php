<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Thunk\Verbs\Lifecycle\StateManager;

class ClearCachedState extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:clear-cached-state';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear the game state cache.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // TODO
    }
}
