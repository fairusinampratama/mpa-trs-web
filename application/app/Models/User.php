<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

// Framework provider placeholder only; no authentication routes or database are enabled.
class User extends Authenticatable
{
    protected $hidden = ['password', 'remember_token'];
}
