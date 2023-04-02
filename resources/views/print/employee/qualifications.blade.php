@extends('print-layout.print')
@section('headers')
    <th>Education Level</th>
    <th>institute</th>
    <th>major</th>
    <th>start date</th>
    <th>end date</th>
@endsection
@section('print-content')
    @php($i = 1)
    @foreach($data as $dat)
        <tr>
            <td>{{$i}}</td>
            <td>{{$dat->educationLevel->name}}</td>
            <td>{{$dat->institute}}</td>
            <td>{{$dat->major}}</td>
            <td>{{$dat->start_date}}</td>
            <td>{{$dat->end_date}}</td>
        </tr>
        @php(++$i)
    @endforeach
@endsection
