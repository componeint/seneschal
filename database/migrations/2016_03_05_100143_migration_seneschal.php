<?php
/**
 * 2016_03_05_100143_migration_seneschal.php
 * Created by @anonymoussc on 05/03/16 17:02.
 */

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrationSeneschal extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function ($table) {
            $table->increments('id');
            $table->string('email');
            $table->string('password');
            $table->text('permissions')->nullable();
            $table->boolean('activated')->default(0);
            $table->string('activation_code')->nullable();
            $table->timestamp('activated_at')->nullable();
            $table->timestamp('last_login')->nullable();
            $table->string('persist_code')->nullable();
            $table->string('reset_password_code')->nullable();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->timestamps();
            $table->engine = 'InnoDB';
            $table->unique('email');
            $table->index('activation_code');
            $table->index('reset_password_code');
        });

        Schema::create('groups', function ($table) {
            $table->increments('id');
            $table->string('name');
            $table->text('permissions')->nullable();
            $table->timestamps();
            $table->engine = 'InnoDB';
            $table->unique('name');
        });

        Schema::create('users_groups', function ($table) {
            $table->integer('user_id')->unsigned();
            $table->integer('group_id')->unsigned();
            $table->engine = 'InnoDB';
            $table->primary(['user_id', 'group_id']);
        });

        Schema::create('throttle', function ($table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->nullable();
            $table->string('ip_address')->nullable();
            $table->integer('attempts')->default(0);
            $table->boolean('suspended')->default(0);
            $table->boolean('banned')->default(0);
            $table->timestamp('last_attempt_at')->nullable();
            $table->timestamp('suspended_at')->nullable();
            $table->timestamp('banned_at')->nullable();
            $table->engine = 'InnoDB';
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('users');
        Schema::drop('groups');
        Schema::drop('users_groups');
        Schema::drop('throttle');
    }
}
