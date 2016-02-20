<?php
/**
 * JwtAuthGroupRepository.php
 * Created by anonymous on 18/12/15 8:38.
 */

namespace Onderdelen\Seneschal\Repositories\Group;

use Einherjars\Carbuncle\Carbuncle;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Events\Dispatcher;
use Illuminate\Http\Response;
use Einherjars\Carbuncle\Groups\GroupExistsException;
use Einherjars\Carbuncle\Groups\GroupNotFoundException;
use Cerberus\Models\Group;
use Onderdelen\Seneschal\DataTransferObjects\BaseResponse;
use Onderdelen\Seneschal\DataTransferObjects\SuccessResponse;
use Onderdelen\Seneschal\DataTransferObjects\FailureResponse;
use Onderdelen\Seneschal\DataTransferObjects\ExceptionResponse;

/**
 * Class JwtAuthGroupRepository
 * @package Onderdelen\Seneschal\Repositories\Group
 */
class JwtAuthGroupRepository implements GroupRepositoryInterface
{
    /**
     * @var Carbuncle
     */
    protected $carbuncle;

    /**
     * Constructor
     */
    public function __construct(Carbuncle $carbuncle, Dispatcher $dispatcher)
    {
        $this->carbuncle     = $carbuncle;
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
            $group = $this->carbuncle->createGroup([
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
            $group = $this->carbuncle->findGroupById($data['id']);

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
            $group = $this->carbuncle->findGroupById($id);

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
        return $this->carbuncle->findGroupById($id);
    }

    /**
     * Return a specific group by a given name
     *
     * @param  string $name
     * @return Group
     */
    public function retrieveByName($name)
    {
        return $this->carbuncle->findGroupByName($name);
    }

    /**
     * Return all the registered groups
     *
     * @return Array
     */
    public function all()
    {
        return $this->carbuncle->getGroupProvider()->findAll();
    }
}