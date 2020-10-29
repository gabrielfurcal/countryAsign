<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'CountryController@index');
Route::get('/countries', 'CountryController@index');
Route::get('/people', 'PeopleController@index');

Route::get('/select/lastCountry', function() {
    
    $result = \App\Models\Countries::select('*')->orderBy('CountryID', 'desc')->first();

    return $result;
});

/*Table: Countries --CRUD--*/
Route::get('/selectAll/countries', function() {

    $countries = \App\Models\Countries::all();

    return $countries;
});

Route::get('/countries/{CountryID}', function($CountryID) {

    $people = \App\Models\Countries::where('CountryID', $CountryID)->first();

    return $people;
});

Route::get('/insert/countries/{Name}', function($Name) {

    try {
        \App\Models\Countries::create(['Name'=>$Name]);
    } catch (Exception $e) { }

});

Route::get('/update/countries/{CountryID}/{Name}', function($CountryID, $Name) {

    try {

        date_default_timezone_set('America/Santo_Domingo');

        \App\Models\Countries::where('CountryID', $CountryID)
                                        ->update(
                                            ['Name' => $Name,
                                            'updated_at' => date("Y-m-d H:i:s")]);

    } catch (Exception $e) { }

});

Route::get('/delete/countries/{CountryID}', function($CountryID) {

    try {

        \App\Models\Countries::where('CountryID', $CountryID)->delete();

    } catch (Exception $e) { }

});


/*Table: People --CRUD--*/
Route::get('/select/lastPeople', function() {
    
    $result = \App\Models\People::select('*')->orderBy('PeopleID', 'desc')->first();

    return $result;
});

Route::get('/selectAll/people', function() {

    $people = \App\Models\People::all();

    return $people;
});

Route::get('/selectAll/people/resume', function() {

    $people = DB::select('SELECT PeopleID, CONCAT(Name, " ", LastName) AS FullName, Email FROM people');

    return $people;
});

Route::get('/people/{PeopleID}', function($PeopleID) {

    $people = \App\Models\People::where('PeopleID', $PeopleID)->first();

    return $people;
});

Route::get('/insert/people/{Name}/{LastName}/{Age}/{Sex}/{Email}/{CountryID}',
    function($Name, $LastName, $Age, $Sex, $Email, $CountryID) {

    try {

        \App\Models\People::create(['Name'=>$Name, 'LastName'=>$LastName,
        'Age'=>$Age, 'Sex'=>$Sex, 'Email'=>$Email,
        'CountryID'=>$CountryID]);

    } catch (Exception $e) { }

});

Route::get('/update/people/{PeopleID}/{Name}/{LastName}/{Age}/{Sex}/{Email}/{CountryID}',
    function($PeopleID, $Name, $LastName, $Age, $Sex, $Email, $CountryID) {

    try {

        date_default_timezone_set('America/Santo_Domingo');

        \App\Models\People::where('PeopleID', $PeopleID)
                                        ->update(
                                            ['Name' => $Name,
                                            'LastName' => $LastName,
                                            'Age' => $Age,
                                            'Sex' => $Sex,
                                            'Email' => $Email,
                                            'CountryID' => $CountryID,
                                            'updated_at' => date("Y-m-d H:i:s")]);

    } catch (Exception $e) { }

});

Route::get('/delete/people/{PeopleID}', function($PeopleID) {

    try {

        \App\Models\People::where('PeopleID', $PeopleID)->delete();

    } catch (Exception $e) { }

});