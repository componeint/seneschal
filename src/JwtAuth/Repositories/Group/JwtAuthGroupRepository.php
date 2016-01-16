<?php
/**
 * JwtAuthGroupRepository.php
 * Created by anonymous on 18/12/15 8:38.
 */

namespace Onderdelen\JwtAuth\Repositories\Group;

use Cartalyst\Sentry\Sentry;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Events\Dispatcher;
use Illuminate\Http\Response;
use Cartalyst\Sentry\Groups\GroupExistsException;
use Cartalyst\Sentry\Groups\GroupNotFoundException;
use Cerberus\Models\Group;
use Onderdelen\JwtAuth\DataTransferObjects\BaseResponse;
use Onderdelen\JwtAuth\DataTransferObjects\SuccessResponse;
use Onderdelen\JwtAuth\DataTransferObjects\FailureResponse;
use Onderdelen\JwtAuth\DataTransferObjects\ExceptionResponse;

/**
 * Class JwtAuthGroupRepository
 * @package Onderdelen\JwtAuth\Repositories\Group
 */
class JwtAuthGroupRepository implements GroupRepositoryInterface
{
    /**
     * @var Sentry
     */
    protected $sentry;

    /**
     * Constructor
     */
    public function __construct(Sentry $sentry, Dispatcher $dispatcher)
    {
        $this->sentry     = $sentry;
        $this->dispatcher = $dispatcher;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return BaseResponse
     */
    public function store($data)
    {
        try {
            // Assemble permissions
            $permissions = (isset($data['permissions']) ? $data['permissions'] : []);

            /// Create the group
            $group = $this->sentry->createGroup([
                'name'        => e($data['name']),
                'permissions' => $permissions,
            ]);

            // Fire the 'group created' event
            $this->dispatcher->fire('cerberus.group.created', ['group' => $group]);

            return new SuccessResponse(trans('Cerberus::groups.created'), ['group' => $group]);
        } catch (GroupExistsException $e) {
            $message = trans('Cerberus::groups.groupexists');

            return new ExceptionResponse($message);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @return BaseResponse
     */
    public function update($data)
    {
        try {
            // Assemble permissions
            $permissions = (isset($data['permissions']) ? $data['permissions'] : []);

            // Find the group using the group id
            $group = $this->sentry->findGroupById($data['id']);

            // Grab the current (pre-edit) permissions and nullify appropriately
            $existingPermissions = $group->getPermissions();
            $nulledPermissions   = array_diff_key($existingPermissions, $permissions);
            foreach ($nulledPermissions as $key => $value) {
                // Set the nulled permissions to 0
                $permissions[$key] = 0;
            }

            // Update the group details
            $group->name        = e($data['name']);
            $group->permissions = $permissions;

            // Update the group
            if ($group->save()) {
                // Fire the 'group updated' event
                $this->dispatcher->fire('cerberus.group.updated', ['group' => $group]);

                return new SuccessResponse(trans('Cerberus::groups.updated'), ['group' => $group]);
            } else {
                // There was a problem
                return new FailureResponse(trans('Cerberus::groups.updateproblem'), ['group' => $group]);
            }
        } catch (GroupExistsException $e) {
            $message = trans('Cerberus::groups.groupexists');

            return new ExceptionResponse($message);
        } catch (GroupNotFoundException $e) {
            $message = trans('Cerberus::groups.notfound');

            return new ExceptionResponse($message);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return BaseResponse
     */
    public function destroy($id)
    {
        try {
            // Find the group using the group id
            $group = $this->sentry->findGroupById($id);

            // Delete the group
            $group->delete();

            // Fire the 'group destroyed' event
            $this->dispatcher->fire('cerberus.group.destroyed', ['group' => $group]);

            return new SuccessResponse(trans('Cerberus::groups.destroyed'), ['group' => $group]);
        } catch (GroupNotFoundException $e) {
            $message = trans('Cerberus::groups.notfound');

            return new ExceptionResponse($message);
        }
    }

    /**
     * Return a specific group by a given id
     *
     * @param  integer $id
     * @return Group
     */
    public function retrieveById($id)
    {
        return $this->sentry->findGroupById($id);
    }

    /**
     * Return a specific group by a given name
     *
     * @param  string $name
     * @return Group
     */
    public function retrieveByName($name)
    {
        return $this->sentry->findGroupByName($name);
    }

    /**
     * Return all the registered groups
     *
     * @return Array
     */
    public function all()
    {
        return $this->sentry->getGroupProvider()->findAll();
    }
}