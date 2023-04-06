<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Human Resource Management System') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <style>
        button{
            border-radius: 10px !important;
            border: none !important;
        }

        input{
            border-top-left-radius: 0 !important;
            border-bottom-left-radius: 0 !important;
            background: none !important;
            font-size: 15px !important;
        }

        input:hover,
        input:active,
        input:focus
        {
            box-shadow: none !important;
            outline: 0 !important;
            background: none !important;
        }
        ::placeholder {
            font-family: Montserrat, sans-serif !important;
        }
        .login-body {
            border-radius: 10px;
        }
        .addon {
            color: #3490dc !important;
            background: transparent;
            font-size: 15px !important;
            text-align: center !important;
            width: 45px !important;
            border-top-left-radius: 10px !important;
            border-bottom-left-radius: 10px !important;

        }
    </style>
    <link href="{{ asset('css/fontawesome.min.css') }}" rel="stylesheet">

</head>
<body style="background: #ffffff">
<div style="background-image: url({{asset('/images/login.jpg')}}); background-size: cover; background-position: center center">
    <main class="">
        <div class="container-fluid">
            <div class="row justify-content-center align-items-center " style="height: 100vh">
                <div class="text-center position-absolute" style="top: 20px;">
                    @if(count($errors) > 0)
                        @foreach( $errors->all() as $message )
                            <div class="alert bg-danger text-white alert-dismissible">
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <span>{{ $message }}</span>
                            </div>
                        @endforeach
                    @endif

                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                </div>
                <div class="col-md-4 text-center">
                    <div class="card login-body p-4 shadow-sm border-0">
                        <img class="mx-auto" height="auto"  width="200" alt="logo" src="{{asset('images/logo.png')}}"/>
                        <div>
                            <div class="card-body">
                                @yield('content')
                            </div>
                            <div class="text-center">
                                <p>WoodMaster &copy; {{date('Y')}} - Powered by TechLineAfrica</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
</body>
</html>
