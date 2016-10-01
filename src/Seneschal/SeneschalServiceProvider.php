<?php
/**
 * SeneschalServiceProvider.php
 * Created by anonymous on 16/11/15 22:33.
 */

namespace Componeint\Seneschal;

use Artisan;
use Hashids\Hashids;
use ReflectionClass;
use Componeint\Seneschal\Commands\SeneschalPublishCommand;
use Illuminate\Foundation\AliasLoader;
use Illuminate\Support\ServiceProvider;
use Componeint\Seneschal\Repositories\Group\JwtAuthGroupRepository;
use Componeint\Seneschal\Repositories\User\JwtAuthUserRepository;
use Componeint\Seneschal\Repositories\Authenticate\AuthenticateRepository;

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
        $componenentsFileName = with(new ReflectionClass('\Componeint\Seneschal\SeneschalServiceProvider'))->getFileName();
        $componenentsPath     = dirname($componenentsFileName);

        // Register Artisan Commands
        $this->registerArtisanCommands();

        // Establish Fallback Config settings
        $this->mergeConfigFrom($componenentsPath . '/../../config/hashids.php', 'hashids');
        $this->mergeConfigFrom($componenentsPath . '/../../config/jwt.php', 'jwt');
        $this->mergeConfigFrom($componenentsPath . '/../../config/seneschal.php', 'seneschal');
        $this->mergeConfigFrom($componenentsPath . '/../../config/sentry.php', 'sentry');

        // Establish Views Namespace
        if (is_dir(base_path() . '/resources/views/seneschal')) {
            // The package views have been published - use those views.
            $this->loadViewsFrom(base_path() . '/resources/views/seneschal', 'Seneschal');
        } else {
            // The package views have not been published. Use the defaults.
            $this->loadViewsFrom($componenentsPath . '/../views/foundation', 'Seneschal');
        }

        // Establish Translator Namespace
        $this->loadTranslationsFrom($componenentsPath . '/../../resources/lang', 'Seneschal');

        // Include custom validation rules
        include $componenentsPath . '/../validators.php';

        // Should we register the default routes?
        if (config('seneschal.routes_enabled')) {
            include $componenentsPath . '/../routes.php';
        }

        // Set up event listeners
        $dispatcher = $this->app->make('events');
        $dispatcher->subscribe('Componeint\Seneschal\Listeners\UserEventListener');
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->app->register(\Tymon\JWTAuth\Providers\JWTAuthServiceProvider::class);
        $this->app->register(\Componeint\Seneschal\SentryServiceProvider::class);
        $this->app->register(\Vinkla\Hashids\HashidsServiceProvider::class);

        // Load the Facade aliases
        $loader = AliasLoader::getInstance();
        $loader->alias('Sentry', \Cartalyst\Sentry\Facades\Laravel\Sentry::class);
        $loader->alias('Hashids', \Vinkla\Hashids\Facades\Hashids::class);
        $loader->alias('JWTAuth', \Tymon\JWTAuth\Facades\JWTAuth::class);
        $loader->alias('JWTFactory', \Tymon\JWTAuth\Facades\JWTFactory::class);

        // Bind the User Repository
        $this->app->bind('Componeint\Seneschal\Repositories\User\UserRepositoryInterface', function ($app) {
            return new JwtAuthUserRepository(
                $app['sentry'],
                $app['config'],
                $app['events']
            );
        });

        // Bind the Group Repository
        $this->app->bind('Componeint\Seneschal\Repositories\Group\GroupRepositoryInterface', function ($app) {
            return new JwtAuthGroupRepository(
                $app['sentry'],
                $app['events']
            );
        });

        // Bind the Authenticate Repository
        $this->app->bind('Componeint\Seneschal\Repositories\Authenticate\AuthenticateRepositoryInterface',
            function ($app) {
                return new AuthenticateRepository(
                    $app['sentry'],
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
        return ['auth', 'sentry'];
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
