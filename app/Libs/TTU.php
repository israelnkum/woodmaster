<?php

namespace App\Libs;

use GuzzleHttp\Promise\PromiseInterface;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;

class TTU
{
    private string $baseUrl;

    public function __construct(){
        $this->baseUrl = env('TTU_API_BASE');
    }

    public function call(): PendingRequest
    {
        return  Http::baseUrl($this->baseUrl)->withHeaders($this->headers());
    }

    public function headers(): array
    {
        return [
            'Accept' => 'application/json',
            'Content-Type' => 'application/json'
        ];
    }
    public function info($indexNumber){
        return $this->call()->get('/admin/students/password/'.$indexNumber);
    }

    public function completeInfo($indexNumber): PromiseInterface|Response
    {
        return $this->call()->get('/student/'.$indexNumber.'/fee_type/kkk');
    }
}
