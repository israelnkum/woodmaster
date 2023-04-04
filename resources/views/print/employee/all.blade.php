@extends('print-layout.print')
@section('headers')
    <th>Staff ID</th>
    <th>Name</th>
    <th>Department</th>
    <th>Rank</th>
    <th>Gtec Placement</th>
    <th>Gender</th>
    <th>D.O.B</th>
    <th>Phone Number</th>
@endsection
@section('print-content')
    @php($i = 1)
    @foreach($data as $dat)
        <tr>
            <td>{{$i}}</td>
            <td>{{$dat->staff_id}}</td>
            <td>{{$dat->name}}</td>
            <td>{{$dat->department->name}}</td>
            <td>{{$dat->rank->name}}</td>
            <td>{{$dat->gtecPlacement->name}}</td>
            <td>{{$dat->gender}}</td>
            <td>{{$dat->dob}}</td>
            <td>{{$dat->contactDetail->telephone}}</td>
        </tr>
        @php(++$i)
    @endforeach
@endsection
