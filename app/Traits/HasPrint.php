<?php

namespace App\Traits;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Response;

trait HasPrint
{
    public function pdf($view, $data, $filename, $orientation = 'portrait'): Response
    {
        return PDF::loadView($view, compact('data'))
            ->setPaper('a4', $orientation)
            ->download($filename.'.pdf');
    }
}
