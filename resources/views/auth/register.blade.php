@extends('layouts.login')
@section('content')
    <div class="container">
        <div class="row justify-content-center align-items-center" style="height: 100vh">
            <div class="col-md-4">
                <div class="card login-body shadow-sm border-0 d-flex justify-content-center">
                    <div>
                        <div class="card-body">
                            <div class="text-center">
                                <h1 class="title">Electronic</h1>
                                <h1 class="subTitle">Voting</h1>
                                <h6 class="text-uppercase" style="font-size: 12px">Enter your index number to begin</h6>
                            </div>
                            <form method="POST" action="{{ route('register') }}">
                                @csrf
                                <div class="form-group row">
                                    <div class="col-md-12">

                                        @if(session('message'))
                                            <div class="alert d-flex alert-dismissible alert-fixed fade show" style="border-radius: 0; " role="alert">
                                                <div class="p-4 bg-danger text-white">
                                                    <svg class="bi bi-x-circle-fill " width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-4.146-3.146a.5.5 0 00-.708-.708L8 7.293 4.854 4.146a.5.5 0 10-.708.708L7.293 8l-3.147 3.146a.5.5 0 00.708.708L8 8.707l3.146 3.147a.5.5 0 00.708-.708L8.707 8l3.147-3.146z" clip-rule="evenodd"/>
                                                    </svg>
                                                    <b>Error</b>
                                                </div>
                                                <div class="p-4 align-content-center border-danger border text-danger bg-white" >
                                                    {{session('message')}}
                                                </div>
                                            </div>
                                        @endif
                                    </div>
                                    {{-- <div class="col-md-12">
                                         <div class="input-group mb-3">
                                             <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">
                                                <i class="fa fa-user-circle"></i>
                                            </span>
                                             </div>
                                             <input id="lastName" placeholder="Surname" type="text" class="form-control @error('lastName') is-invalid @enderror" name="lastName" value="{{ old('lastName') }}" required autocomplete="lastName" autofocus>
                                         </div>
                                         @error('lastName')
                                         <span class="invalid-feedback" role="alert">
                                         <strong>{{ $message }}</strong>
                                     </span>
                                         @enderror
                                     </div>
                                     <div class="col-md-12">
                                         <div class="input-group mb-2">
                                             <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">
                                                <i class="fa fa-user-circle"></i>
                                            </span>
                                             </div>
                                             <input id="firstName" placeholder="Other names" type="text" class="form-control @error('name') is-invalid @enderror" name="firstName" value="{{ old('firstName') }}" required autocomplete="firstName" autofocus>
                                         </div>
                                         @error('firstName')
                                         <span class="invalid-feedback" role="alert">
                                         <strong>{{ $message }}</strong>
                                     </span>
                                         @enderror
                                     </div>--}}
                                    <div class="col-md-12">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                           <span class="input-group-text" id="basic-addon1">
                                               <i class="fa fa-user-circle"></i>
                                           </span>
                                            </div>
                                            <input id="username" placeholder="Eg: BT/SEG/19/006" type="text" class="form-control @error('username') is-invalid @enderror" name="username" value="{{ old('username') }}" required autocomplete="username">
                                        </div>
                                        @error('username')
                                        <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                        @enderror
                                    </div>

                                    {{--<div class="col-md-12">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                           <span class="input-group-text" id="basic-addon1">
                                               <i class="fa fa-lock" style="font-size: 23px"></i>
                                           </span>
                                            </div>
                                            <input id="password" placeholder="Password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">
                                        </div>
                                        @error('password')
                                        <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                        @enderror
                                    </div>--}}
                                </div>

                                <div class="form-group row mb-0">
                                    <div class="col-md-6 offset-md-3">
                                        <button type="submit" class="btn btn-primary btn-block">
                                            {{ __('Register') }}
                                        </button>
                                    </div>
                                    @if (Route::has('login'))
                                        <div class="col-md-12 mt-2 text-center">
                                            Already have an account?&nbsp; <br>
                                            <a class="btn btn-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                                        </div>
                                    @endif
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
