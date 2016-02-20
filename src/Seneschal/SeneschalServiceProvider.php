<?php
/**
 * SeneschalServiceProvider.php
 * Created by anonymous on 16/11/15 22:33.
 */

namespace Onderdelen\Seneschal;

use Artisan;
use Hashids\Hashids;
use ReflectionClass;
use Onderdelen\Seneschal\Commands\SeneschalPublishCommand;
use Illuminate\Foundation\AliasLoader;
use Illuminate\Support\ServiceProvider;
use Onderdelen\Seneschal\Repositories\Group\JwtAuthGroupRepository;
use Onderdelen\Seneschal\Repositories\User\JwtAuthUserRepository;
use Onderdelen\Seneschal\Repositories\Authenticate\AuthenticateRepository;

class SeneschalServiceProvider extends ServiceProvider
{
    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = false;

    /**
     * Bootstrap the application events.
     *
     * @return void
     */
    public function boot()
    {
        // Find path to the package
        $componenentsFileName = with(new ReflectionClass('\Onderdelen\Seneschal\SeneschalServiceProvider'))->getFileName();
        $componenentsPath     = dirname($componenentsFileName);

        // Register Artisan Commands
        $this->registerArtisanCommands();

        // Establish Fallback Config settings
        $this->mergeConfigFrom($componenentsPath . '/../config/seneschal.php', 'seneschal');
        $this->mergeConfigFrom($componenentsPath . '/../config/carbuncle.php', 'carbuncle');

        // Establish Views Namespace
        if (is_dir(base_path() . '/resources/views/seneschal')) {
            // The package views have been published - use those views.
            $this->loadViewsFrom(base_path() . '/resources/views/seneschal', 'Seneschal');
        } else {
            // The package views have not been published. Use the defaults.
            $this->loadViewsFrom($componenentsPath . '/../views/bootstrap', 'Seneschal');
        }

        // Establish Translator Namespace
        $this->loadTranslationsFrom($componenentsPath . '/../lang', 'Seneschal');

        // Include custom validation rules
        include $componenentsPath . '/../validators.php';

        // Should we register the default routes?
        if (config('seneschal.routes_enabled')) {
            include $componenentsPath . '/../routes.php';
        }

        // Set up event listeners
        $dispatcher = $this->app->make('events');
        $dispatcher->subscribe('Onderdelen\Seneschal\Listeners\UserEventListener');

        //$this->loadViewsFrom($componenentsPath . '/../views', 'jwtauth');

        //include $componenentsPath . '/../routes.php';

    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->app->register(\Onderdelen\AppFoundation\AppFoundationServiceProvider::class);
        $this->app->register(\Tymon\JWTAuth\Providers\JWTAuthServiceProvider::class);

        // Register the Carbuncle Service Provider
        $this->app->register(\Onderdelen\Seneschal\CarbuncleServiceProvider::class);

        // Register the Vinkla/Hashids Service Provider
        $this->app->register(\Vinkla\Hashids\HashidsServiceProvider::class);

        // Load the Carbuncle and Hashid Facade Aliases
        $loader = AliasLoader::getInstance();
        $loader->alias('Carbuncle', \Einherjars\Carbuncle\Facades\Laravel\Carbuncle::class);
        $loader->alias('Hashids', \Vinkla\Hashids\Facades\Hashids::class);

        $loader = AliasLoader::getInstance();
        $loader->alias('JWTAuth', \Tymon\JWTAuth\Facades\JWTAuth::class);
        $loader->alias('JWTFactory', \Tymon\JWTAuth\Facades\JWTFactory::class);

        // Bind the User Repository
        $this->app->bind('Onderdelen\Seneschal\Repositories\User\UserRepositoryInterface', function ($app) {
            return new JwtAuthUserRepository(
                $app['carbuncle'],
                $app['config'],
                $app['events']
            );
        });

        // Bind the Group Repository
        $this->app->bind('Onderdelen\Seneschal\Repositories\Group\GroupRepositoryInterface', function ($app) {
            return new JwtAuthGroupRepository(
                $app['carbuncle'],
                $app['events']
            );
        });

        // Bind the Authenticate Repository
        $this->app->bind('Onderdelen\Seneschal\Repositories\Authenticate\AuthenticateRepositoryInterface',
            function ($app) {
                return new AuthenticateRepository(
                    $app['carbuncle'],
                    $app['events']
                );
            });
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return ['auth', 'carbuncle'];
    }

    /**
     * Register the Artisan Commands
     */
    private function registerArtisanCommands()
    {
        $this->app['seneschal.publisher'] = $this->app->share(function ($app) {
            return new SeneschalPublishCommand(
                $app->make('files')
            );
        });

        $this->commands('seneschal.publisher');
    }

}
