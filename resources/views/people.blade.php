@extends("layouts.plantilla")

@section('css')
    @include('css.datatable_basic_button_bootstrap4')
    <link rel="stylesheet" href="{{ asset('css/main.css') }}">
    <link rel="stylesheet" href="{{ asset('css/people.css') }}">
@endsection()

@section('header')
@endsection

@section('section')

    <div>
        <form action="" method="post">

        <div id="main_btns" class="main_btns">
            <button id="btn_edit" type="button" class="btn btn-primary"></button>
            <button id="btn_new" type="button" class="btn btn-primary"></button>
            <button id="btn_cancel" type="button" class="btn btn-danger"></button>
            <button id="btn_save" type="button" class="btn btn-success"></button>
        </div>

        <div class="row">
            <div class="col form-group col-md-2">
                <label for="peopleID">People ID:</label>
                <input type="text" name="PeopleID" id="peopleID" class="form-control" disabled />
            </div>
            
            <div class="col form-group col-md-5">
                <label for="peopleName" class="priority">Name:</label>
                <input type="text" name="Name" id="peopleName" class="form-control disable_input" />
            </div>

            <div class="col form-group col-md-5">
                <label for="peopleLastName" class="priority">Last Name:</label>
                <input type="text" name="LastName" id="peopleLastName" class="form-control disable_input" />
            </div>
        </div>

        <div class="row">
            <div class="col form-group col-md-2">
                <label for="peopleAge" class="priority">Age:</label>
                <input type="text" name="Age" id="peopleAge" class="form-control disable_input" />
            </div>

            <div class="col form-group col-md-2">
                <label for="peopleSex">Sex:</label>
                <select name="Sex" id="peopleSex" class="form-control disable_select">
                    <option value="M">Male</option>
                    <option value="F">Famale</option>
                </select>
            </div>

            <div class="col form-group col-md-8">
                <label for="peopleEmail" class="priority">Email:</label>
                <input type="text" name="Email" id="peopleEmail" class="form-control disable_input" />
            </div>
        </div>

        <div class="row">

            <div class="col form-group col-md-2">
                <label for="countryID">Country ID:</label>
                <div class="search_cont">
                    <input type="text" name="CountryID" id="countryID" class="form-control search disable_input" >
                        <span id="searchCountry" class="search_icon"></span>
                    </input>
                </div>
            </div>
            
            <div class="col form-group col-md-10 input_secondary">
                <label for="countryIDName" class="priority">Country ID</label>
                <input type="text" id="countryIDName" class="form-control" readonly/>
            </div>
        </div>

        </form>
    </div>

    <div id="contTablePeople" class="table_datatable_button">
        <table id="table_people" class="table table-bordered table-hover table-sm" width=100%>
            <thead>
                <tr>
                    <th scope="col">People ID</th>
                    <th scope="col">Full name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Accions</th>
                </tr>
            </thead>

            <tbody>
            </tbody>
        </table>
    </div>

    <!--
    <div class="contSearch">
        <div id="contTableCountry" class="table_datatable_button">
            <table id="table_countries" class="table table-bordered table-hover table-sm" width=100%>
                <thead>
                    <tr>
                        <th scope="col">Country ID</th>
                        <th scope="col">Name</th>
                    </tr>
                </thead>

                <tbody>
                </tbody>
            </table>
        </div>
    </div>
    -->
@endsection

@section('footer')
@endsection

@section('script')
    @include('js.datatable_button_implement')
    <script src="{{ asset('js/datatable_implement_table_button.js') }}"></script>
    <script src="{{ asset('js/people.js') }}"></script>
@endsection()