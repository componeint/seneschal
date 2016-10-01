<?php
/**
 * SeneschalDatabaseSeeder.php
 * Created by @anonymoussc on 05/03/16 17:13.
 */

use Illuminate\Database\Seeder;

class SeneschalDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \Eloquent::unguard();

        $this->call('GroupSeeder');
        $this->call('UserSeeder');
        $this->call('UserGroupSeeder');
    }

}

class GroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('groups')->delete();

        Sentry::getGroupProvider()->create([
            'name'        => 'Users',
            'permissions' => [
                'admin' => 0,
                'users' => 1,
            ],
        ]);

        Sentry::getGroupProvider()->create([
            'name'        => 'Admins',
            'permissions' => [
                'admin' => 1,
                'users' => 1,
            ],
        ]);
    }
}

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->delete();

        Sentry::getUserProvider()->create([
            'email'     => 'admin@admin.com',
            'username'  => 'admin',
            'password'  => 'secretadmin',
            'activated' => 1,
        ]);

        Sentry::getUserProvider()->create([
            'email'     => 'user@user.com',
            'username'  => '',
            'password'  => 'secretuser',
            'activated' => 1,
        ]);
    }
}

class UserGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users_groups')->delete();

        $userUser  = Sentry::getUserProvider()->findByLogin('user@user.com');
        $adminUser = Sentry::getUserProvider()->findByLogin('admin@admin.com');

        $userGroup  = Sentry::getGroupProvider()->findByName('Users');
        $adminGroup = Sentry::getGroupProvider()->findByName('Admins');

        // Assign the groups to the users
        $userUser->addGroup($userGroup);
        $adminUser->addGroup($userGroup);
        $adminUser->addGroup($adminGroup);
    }
}

