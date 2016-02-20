@extends(config('seneschal.layout'))

{{-- Web site Title --}}
@section('title', 'User Profile')

{{-- Content --}}
@section('content')

<?php
    // Determine the edit profile route
    if (($user->email == Carbuncle::getUser()->email)) {
        $editAction = route('seneschal.profile.edit');
    } else {
        $editAction =  action('\\Seneschal\Controllers\UserController@edit', [$user->hash]);
    }
?>

<div class="row">
    <h4>{{ $user->email }}'s Account Details</h4>
</div>

<div class="row">
    <div class="twelve columns">
	    @if ($user->first_name)
	    	<p><strong>First Name:</strong> {{ $user->first_name }} </p>
		@endif
		@if ($user->last_name)
	    	<p><strong>Last Name:</strong> {{ $user->last_name }} </p>
		@endif
	    <p><strong>Email:</strong> {{ $user->email }}</p>
	    
	    <p><em>Account created: {{ $user->created_at }}</em></p>
		<p><em>Last Updated: {{ $user->updated_at }}</em></p>

		@foreach ($user->groups as $group)
		<li>{{ $group->name }}</li>
		@endforeach

	</div>
</div>

<div class="row">
    <div class="twelve columns">
        <h5>User Object</h5>
        <code>{{ var_dump($user) }}</code>
    </div>
</div>
@stop
