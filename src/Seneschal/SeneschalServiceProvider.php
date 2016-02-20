<?php

namespace Onderdelen\Seneschal;

use ReflectionClass;
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

        $this->loadViewsFrom($componenentsPath . '/../views', 'jwtauth');

        include $componenentsPath . '/../routes.php';

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

        $loader = AliasLoader::getInstance();
        $loader->alias('JWTAuth', \Tymon\JWTAuth\Facades\JWTAuth::class);
        $loader->alias('JWTFactory', \Tymon\JWTAuth\Facades\JWTFactory::class);

        $this->app->register(\Cerberus\CerberusServiceProvider::class);

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
        return [];
    }

}
