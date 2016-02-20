<?php
/**
 * CarbuncleAdminAccess.php
 * Modified from https://github.com/rydurham/Sentinel
 * by anonymous on 13/01/16 1:37.
 */

namespace Onderdelen\Seneschal\Middleware;

use Closure;
use Session;
use Carbuncle;
use Illuminate\Contracts\Routing\Middleware;

class CarbuncleAdminAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure                 $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // First make sure there is an active session
        if (!Carbuncle::check()) {
            if ($request->ajax()) {
                return response('Unauthorized.', 401);
            } else {
                return redirect()->guest(route('seneschal.login'));
            }
        }

        // Now check to see if the current user has the 'admin' permission
        if (!Carbuncle::getUser()->hasAccess('admin')) {
            if ($request->ajax()) {
                return response('Unauthorized.', 401);
            } else {
                Session::flash('error', trans('Seneschal::users.noaccess'));

                return redirect()->route('seneschal.login');
            }
        }

        // All clear - we are good to move forward
        return $next($request);
    }
}
