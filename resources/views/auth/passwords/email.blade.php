@extends('layouts.login')

@section('content')
    <form method="POST" action="{{ route('password.email') }}">
        @csrf

        <div class="form-group row">
            <div class="col-md-12 text-left">
                <label for="email">{{ __('E-Mail Address') }}</label>
                <input placeholder="Enter your email address" id="email" type="email"
                       style="border-radius: 10px !important;"
                       class="form-control form-control-lg @error('email') is-invalid @enderror"
                       name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
            </div>
        </div>

        <div class="form-group row mb-2">
            <div class="col-md-12">
                <button type="submit" class="btn btn-primary btn-lg btn-block">
                    {{ __('Send Password Reset Link') }}
                </button>
            </div>
        </div>

        <div class="col-md-12 text-center">
            @if (Route::has('password.request'))
                <a class="" href="/">
                    {{ __('Login Here') }}
                </a>
            @endif
        </div>
    </form>
@endsection
