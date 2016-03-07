<!DOCTYPE html>
<!--[if IE 9]><html class="lt-ie10" lang="en" > <![endif]-->
<html class="no-js" lang="en" >

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>
		@section('title') 
		@show 
	</title>

	<!-- If you are using CSS version, only link these 2 files, you may add app.css to use for your overrides if you like. -->
	<link rel="stylesheet" href="{{ asset('packages/componeint/seneschal/css/normalize.css') }}">
	<link rel="stylesheet" href="{{ asset('packages/componeint/seneschal/css/foundation.min.css') }}">

	<script src="{{ asset('packages/componeint/seneschal/js/modernizr.js') }}"></script>

</head>
<body>

	<nav class="top-bar" data-topbar>
		<ul class="title-area">
			<li class="name">
				<h1><a href="/">Seneschal</a></h1>
			</li>
			<li class="toggle-topbar menu-icon"><a href="#">Menu</a></li>
		</ul>

		<section class="top-bar-section">
			<!-- Right Nav Section -->
			<ul class="right">
				 @if (Sentry::check())
					<li {!! (Request::is('profile') ? 'class="active"' : '') !!}>
						<a href="{{ route('seneschal.profile.show') }}">{{ Sentry::getUser()->email }}</a>
					</li>
					<li>
						<a href="{{ route('seneschal.logout') }}">Logout</a>
					</li>
				@else
					<li {!! (Request::is('login') ? 'class="active"' : '') !!}>
						<a href="{{ route('seneschal.login') }}">Login</a>
					</li>
					<li {!! (Request::is('register') ? 'class="active"' : '') !!}>
						<a href="{{ route('seneschal.register.form') }}">Register</a>
					</li>
				@endif
			</ul>

			<!-- Left Nav Section -->
			<ul class="left">
				@if (Sentry::check() && Sentry::getUser()->hasAccess('admin'))
					<li {!! (Request::is('users*') ? 'class="active"' : '') !!}>
						<a href="{{ action('\\Seneschal\Controllers\UserController@index') }}">Users</a>
					</li>
					<li {!! (Request::is('groups*') ? 'class="active"' : '') !!}>
						<a href="{{ action('\\Seneschal\Controllers\GroupController@index') }}">Groups</a>
					</li>
				@endif
			</ul>
		</section>
	</nav>

	<!-- Notifications -->
	@include('Seneschal::layouts/notifications')
	<!-- ./ notifications -->

	<!-- Content -->
	@yield('content')
	<!-- ./ content -->

	<script src="{{ asset('packages/componeint/seneschal/js/jquery.js') }}"></script>
	<script src="{{ asset('packages/componeint/seneschal/js/foundation.min.js') }}"></script>
	<script src="{{ asset('packages/componeint/seneschal/js/restfulizer.js') }}"></script>
	<!-- Thanks to Zizaco for the Restfulizer script.  http://zizaco.net  -->
	<script>
		$(document).foundation();
	</script>
</body>
</html>
