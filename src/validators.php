<?php
/**
 * validators.php
 * Modified from https://github.com/rydurham/Sentinel
 * by anonymous on 12/01/16 22:28.
 */

Validator::extend('alpha_spaces', function ($attribute, $value) {
    return preg_match('/^[\pL\s]+$/u', $value);
});