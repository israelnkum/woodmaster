@extends('print-layout.print')
@section('headers')
    <th>Log/Sub Log</th>
    <th>Number</th>
    <th>Sheets</th>
    <th>Length (cm)</th>
    <th>Width (cm)</th>
    <th>Square Meter(mq)</th>
@endsection
@section('print-content')
    @php($total = 0)
    @foreach($data['woodResource'] as $log => $item)
        @foreach($item as $subLog => $subLogData)
            @php($totalSquareMeter = 0)
            @foreach($subLogData as $subData)
                <tr>
                    <td>{{$log. '/' .$subLog}}</td>
                    <td>{{$subData->number}}</td>
                    <td>{{$subData->sheets}}</td>
                    <td>{{$subData->length}}</td>
                    <td>{{$subData->width}}</td>
                    <td>{{$subData->square_meter}}</td>
                </tr>
                @php($totalSquareMeter += $subData->square_meter)
                @php($total += $subData->square_meter)
            @endforeach
            <tr>
                <td colspan="4" class="py-5">&nbsp;</td>
                <td class="text-right">Total square meter</td>
                <td style="border: solid 1px gray; font-weight: bold;" class="border-2">{{$totalSquareMeter}}</td>
            </tr>
        @endforeach
    @endforeach
    <tr>
        <td colspan="6" style="background: white !important; font-size: 20px; font-weight: bold; text-align: center !important;text-transform: uppercase !important;">
            <p>Superficie Totale</p>
            <p>{{$total}}</p>
        </td>
    </tr>
@endsection
