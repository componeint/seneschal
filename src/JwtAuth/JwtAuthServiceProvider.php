<?php namespace Onderdelen\JwtAuth;

use ReflectionClass;
use Illuminate\Foundation\AliasLoader;
use Illuminate\Support\ServiceProvider;
use Onderdelen\JwtAuth\Repositories\Group\GroupRepository;
use Onderdelen\JwtAuth\Repositories\User\UserRepository;
use Onderdelen\JwtAuth\Repositories\Authenticate\AuthenticateRepository;

class JwtAuthServiceProvider extends ServiceProvider
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
        $componenentsFileName = with(new ReflectionClass('\Onderdelen\JwtAuth\JwtAuthServiceProvider'))->getFileName();
        $componenentsPath     = dirname($componenentsFileName);

        $this->loadViewsFrom($componenentsPath . '/../views', 'jwtauth');

        include $componenentsPath . '/../routes.php';

        // Set up event listeners
        $dispatcher = $this->app->make('events');
        $dispatcher->subscribe('Onderdelen\JwtAuth\Listeners\UserEventListener');
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->app->register(\Tymon\JWTAuth\Providers\JWTAuthServiceProvider::class);

        $loader = AliasLoader::getInstance();
        $loader->alias('JWTAuth', \Tymon\JWTAuth\Facades\JWTAuth::class);
        $loader->alias('JWTFactory', \Tymon\JWTAuth\Facades\JWTFactory::class);

        $this->app->register(\Consigliere\AppFoundation\AppFoundationServiceProvider::class);
        $this->app->register(\Sentinel\SentinelServiceProvider::class);

        // Bind the User Repository
        $this->app->bind('Onderdelen\JwtAuth\Repositories\User\UserRepositoryInterface', function ($app) {
            return new UserRepository(
                $app['sentry'],
                $app['config'],
                $app['events']
            );
        });

        // Bind the Group Repository
        $this->app->bind('Onderdelen\JwtAuth\Repositories\Group\GroupRepositoryInterface', function ($app) {
            return new GroupRepository(
                $app['sentry'],
                $app['events']
            );
        });

        // Bind the Authenticate Repository
        $this->app->bind('Onderdelen\JwtAuth\Repositories\Authenticate\AuthenticateRepositoryInterface', function ($app) {
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
        return [];
    }

}
