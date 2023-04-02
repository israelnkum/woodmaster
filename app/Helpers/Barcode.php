<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Log;

class Barcode
{
    /**
     * @param array $data
     * @return void
     */
    public static function printBarcode(array $data): void
    {
        $printContent = "^XA
                        ^CF0,35
                        ^FO250,20^FD".$data['log']."/".$data['subLog']."                                       ".$data['number']."^FS
                        ^CF0,30
                        ^FX Third section with bar code.
                        ^BY1,3,80
                        ^FO620,48^BC,90,N,N
                        ^FD".$data['log']."/".$data['subLog']."-".$data['sheets']."-".$data['squareMeter']."^FS
                        ^CF0,35
                        ^FO250,150^FD".$data['length']."x".$data['width']."                   ".$data['sheets']."             ".$data['squareMeter']."^FS
                        ^XZ";


        $printContent = trim($printContent);

        if (!empty( env('PRINTER_HOST')) && !empty($printContent)) {
            ZplPrinter::printer( env('PRINTER_HOST'))->send($printContent);
        }else {
            Log::info(  env('PRINTER_HOST'));
        }
    }
}
