<?php

namespace App;

class Helpers
{
    static function formatName ($name): array
    {
        $nameArray = explode(' ',$name);
        $otherNames  =  implode(' ', array_slice($nameArray, 1));
        return [
            $nameArray[0], $otherNames
        ];
    }
}
