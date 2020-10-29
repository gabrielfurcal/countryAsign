<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  @yield("head_meta")

  <title>Laravel Practice</title>

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

  <!--styles-->
  <link rel="stylesheet" href="{{ asset('css/bootstrap.min.css') }}">
  <link rel="stylesheet" href="{{ asset('css/plantilla.css') }}">

  @yield("css")
</head>

<body>
    
    <header>
        @yield("header")

        <nav class="navbar navbar-expand-lg navbar-light bg-light navbar_principal">
            <a class="navbar-brand" href="{{ url('/countries') }}">Countries</a>
            <button class="navbar-toggler navbar_principal_button" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="{{ url('/people') }}">People</a>
                </li>
              </ul>
            </div>
        </nav>

    </header>

    <section>
        <div class="col-md-8 justify-content-center">
          @yield("section")
        <div>
    </section>

    <footer>
        @yield("footer")
        <p>LARAVEL PRACTICE 10-26-2020</p>
    </footer>

    <!--scripts-->

    <!--jquery versión 3.5.1-->
    <script src="{{ asset('js/jquery-3.5.1.min.js') }}"></script>
    <!--Bootstrap versión 4.5.3-->
    <script src="{{ asset('js/bootstrap.min.js') }}"></script>
    <!--fontawesome script kit-->
    <script src="https://kit.fontawesome.com/c80852f30f.js" crossorigin="anonymous"></script>
    <!--Sweet Alert script-->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    @yield('script')

</body>

</html>