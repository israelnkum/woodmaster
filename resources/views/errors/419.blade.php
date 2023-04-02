@extends('errors::minimal')

@section('title', __('Page Expired'))
@section('code', '419')
{{--@section('message', __('Page Expired'))--}}
@section('message')
    Oops! Page Expired <a href="{{route('login')}}">Click Here</a>
@endsection
