<?php
/**
 * SeneschalPublishCommand.php
 * Modified from https://github.com/rydurham/Sentinel
 * by @anonymoussc on 13/01/16 1:50.
 */

namespace Componeint\Seneschal\Commands;

use Illuminate\Console\Command;
use Illuminate\Console\ConfirmableTrait;
use Illuminate\Filesystem\Filesystem;
use ReflectionClass;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class SeneschalPublishCommand extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'seneschal:publish';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Publish assets and config files for the Seneschal Package';

    /**
     * The UI themes supported by Seneschal
     *
     * @var string
     */
    private $themes = ['bootstrap', 'foundation', 'materialize', 'gumby', 'blank'];

    /**
     * The base path of the parent application
     *
     * @var string
     */
    private $appPath;

    /**
     * The path to the Seneschal's src directory
     *
     * @var string
     */
    private $packagePath;

    /**
     * Create a new command instance.
     *
     * @param Filesystem $file
     */
    public function __construct(Filesystem $file)
    {
        parent::__construct();

        // DI Member Assignment
        $this->file = $file;

        // Set Application Path
        $this->appPath = app_path();

        // Set the path to the Seneschal Package namespace root
        $componenentsFileName = with(new ReflectionClass('\Componeint\Seneschal\SeneschalServiceProvider'))->getFileName();
        $this->packagePath    = dirname($componenentsFileName);
    }

    /*
     * This trait allows us to easily check the current environment
     */
    use ConfirmableTrait;

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function fire()
    {
        // Don't allow this command to run in a production environment
        if (!$this->confirmToProceed()) {
            return;
        }

        // Gather options passed to the command
        $theme = strtolower($this->option('theme'));
        $list  = $this->option('list');

        // Are they only asking for a list of themes?
        if ($list) {
            $this->info('Currently supported themes:');

            // Print the list of the current theme options
            foreach ($this->themes as $theme) {
                $this->info(' | ' . ucwords($theme));
            }

            return;
        }

        // Is the theme selection valid?
        if (!in_array($theme, $this->themes)) {
            $this->info(ucwords($theme) . ' is not a supported theme.');

            return;
        }

        // Publish the Seneschal Config
        $this->publishSeneschalConfig();

        // Publish the Sentry Config
        $this->publishSentryConfig();

        // Publish the Mitch/Hashids config files
        $this->publishHashidsConfig();

        // Publish the theme views
        $this->publishViews($theme);

        // Publish the theme assets
        $this->publishAssets($theme);

        // Optionally publish the migrations
        $this->publishMigrations();

        // All done!
        $this->info('Seneschal is now ready to use!');
    }

    /**
     * Get the console command options.
     *
     * @return array
     */
    protected function getOptions()
    {
        return [
            [
                'theme',
                null,
                InputOption::VALUE_OPTIONAL,
                'The name of the UI theme you want to use with Seneschal.',
                'bootstrap',
            ],
            ['list', null, InputOption::VALUE_NONE, 'Show a list of currently supported UI Themes.'],
        ];
    }

    /**
     * Publish the Seneschal Config file
     */
    private function publishSeneschalConfig()
    {
        // Prepare for copying
        $source      = realpath($this->packagePath . '/../../config/seneschal.php');
        $destination = base_path() . '/config/seneschal.php';

        // If this file has already been published, confirm that we want to overwrite.
        if ($this->file->isFile($destination)) {
            $answer = $this->confirm('Seneschal config has already been published. Do you want to overwrite?');

            if (!$answer) {
                return;
            }
        }

        // Copy the configuration files
        $this->file->copy($source, $destination);

        // Notify action completion
        $this->info('Seneschal configuration file published.');
    }

    /**
     * Publish the Sentry Config file
     */
    private function publishSentryConfig()
    {
        // Prepare for copying
        $source      = realpath($this->packagePath . '/../../config/sentry.php');
        $destination = base_path() . '/config/sentry.php';

        // If this file has already been published, confirm that we want to overwrite.
        if ($this->file->isFile($destination)) {
            $answer = $this->confirm('Sentry config has already been published. Do you want to overwrite?');

            if (!$answer) {
                return;
            }
        }

        // Copy the configuration files
        $this->file->copy($source, $destination);

        // Notify action completion
        $this->info('Sentry configuration file published.');
    }


    /**
     * Publish the config file for Vinkla/Hashids
     */
    public function publishHashidsConfig()
    {
        // Prepare file paths
        $source      = realpath($this->packagePath . '/../../config/hashids.php');
        $destination = base_path() . '/config/hashids.php';

        // If there are already config files published, confirm that we want to overwrite them.
        if ($this->file->isFile($destination)) {
            $answer = $this->confirm('Hashid Config file has already been published. Do you want to overwrite?');

            if (!$answer) {
                return;
            }
        }

        // Copy the configuration files
        $this->file->copy($source, $destination);

        // Notify action completion
        $this->info('Vinkla/Hashids configuration file published.');
    }

    /**
     * Publish the seneschal Views for a specified theme
     * @param $theme
     */
    private function publishViews($theme)
    {
        // Prepare for copying files
        $source      = $this->packagePath . '/../../resources/views/' . $theme;
        $destination = base_path() . '/resources/views/seneschal';

        // If there are already views published, confirm that we want to overwrite them.
        if ($this->file->isDirectory($destination)) {
            $answer = $this->confirm('Views have already been published. Do you want to overwrite?');

            if (!$answer) {
                return;
            }
        }

        // Copy the view files for the selected theme
        $this->file->copyDirectory($source, $destination);

        // Notify action completion
        $this->info('Seneschal ' . ucwords($theme) . ' views published.');
    }

    /**
     * Publish the assets needed for a specified theme.
     * @param $theme
     */
    private function publishAssets($theme)
    {
        // Prepare for copying files
        $source      = $this->packagePath . '/../../public/' . $theme;
        $destination = $this->appPath . '/../public/packages/componeint/seneschal';

        // If there are already assets published, confirm that we want to overwrite.
        if ($this->file->isDirectory($destination)) {
            $answer = $this->confirm('Theme assets have already been published. Do you want to overwrite?');

            if (!$answer) {
                return;
            }
        }

        // Copy the asset files for the selected theme
        $this->file->copyDirectory($source, $destination);

        // Notify action completion
        $this->info('Seneschal ' . ucwords($theme) . ' assets published.');
    }

    /**
     * Optionally copy the migration files to the main migration directory
     */
    private function publishMigrations()
    {
        if ($this->confirm('Would you like to publish the migration files?')) {

            // Prepare for copying files
            $source      = $this->packagePath . '/../../database/migrations/';
            $destination = $this->appPath . '/../database/migrations';

            // Copy the asset files for the selected theme
            $this->file->copyDirectory($source, $destination);

            // Notify action completion
            $this->info('Migration files have been published.');
        }
    }
}
