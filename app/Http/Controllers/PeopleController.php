<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PeopleController extends Controller
{
    public function index()
    {
        $people = \App\Models\People::all();;

        return view('people', compact('people'));
    }
}
