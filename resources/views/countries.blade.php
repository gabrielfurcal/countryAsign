@extends("layouts.plantilla")

@section('header')
  <!--El contenedor de la tabla debe de tener la clase 'table_datatable_button'-->
  @include('css.datatable_basic_button_bootstrap4')
  <!--Para estilisar los botones principales-->
  <link rel="stylesheet" href="{{ asset('css/main.css') }}">

  <link rel="stylesheet" href="{{ asset('css/countries.css') }}">

@endsection

@section('section')

  <div>
    <form action="/insert/country" method="POST">

      <div id="main_btns" class="main_btns">
        <button id="btn_edit" type="button" class="btn btn-primary"></button>
        <button id="btn_new" type="button" class="btn btn-primary"></button>
        <button id="btn_cancel" type="button" class="btn btn-danger"></button>
        <button id="btn_save" type="button" class="btn btn-success"></button>
      </div>

      <div class="row">
        <div class="col form-group col-md-3">
          <label for="countryID">Country ID:</label>
          <input type="text" name="CountryID" id="countryID" class="form-control" readonly />
        </div>
        
        <div class="col form-group col-md-9">
          <label for="countryName" class="priority">Name:</label>
          <input type="text" name="Name" id="countryName" class="form-control disable_input" />
        </div>
      </div>

    </form>
  </div>


  <div id="contTableCountry" class="table_datatable_button">
    <table id="table_countries" class="table table-bordered table-hover table-sm" width=100%>
        <thead>
            <tr>
                <th scope="col">Country ID</th>
                <th scope="col">Name</th>
                <th scope="col">Accions</th>
            </tr>
        </thead>

        <tbody>
        </tbody>
    </table>
  </div>
@endsection

@section('footer')  
@endsection

@section('script')
  @include('js.datatable_button_implement')
  <script src="{{ asset('js/datatable_implement_table_button.js') }}"></script>
  <script src="{{ asset('js/countries.js') }}"></script>
@endsection
