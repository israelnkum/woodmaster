<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Inventory') }}</title>
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <style>
        table {
            font-family: 'Arial', sans-serif;
            width: 100%;
            margin-bottom: 1rem;
            color: #000;
            vertical-align: top;
        }
        th{
            border-bottom: solid 2px #262626;
            text-transform: capitalize;
            color: #1c1c1c;
            font-size: 12px;
            font-weight: lighter;
            padding: 10px;
            margin: 0;
        }
        td {
            padding: 10px;
            font-size: 13px;
            font-weight: lighter;
            margin: 0;
        }
        table > tbody > tr:nth-of-type(odd) > * {
            background: rgba(26, 26, 26, 0.04);
            color: #000000;
        }
    </style>
</head>
<body>
<div>
{{--    <x-print-header :employee-dashboard-id="$data[0]->employee_id"/>--}}
</div>
<table border="0">
    <thead align="left">
    <tr align="left">
        <th>#</th>
        @yield('headers')
    </tr>
    </thead>
    <tbody>
    @yield('print-content')
    </tbody>
</table>
</body>
</html>
