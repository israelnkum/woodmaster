<!-- Nothing worth having comes easy. - Theodore Roosevelt -->
<div>
    <table style="text-transform: uppercase !important;">
        <tbody>
        <tr class="text-center bg-white">
            <td style="
                background: white !important;
                text-align: center !important;
                text-transform: uppercase !important;
                text-decoration: underline !important;
                font-weight: bold !important; font-size: 25px !important;"
                colspan="3">
                DISTINTAN MISURAZIONE
            </td>
        </tr>
        <tr>
            <td style="background: #fff; font-weight: bold !important;">
                <p>Pedana:&nbsp;{{$pallet->pallet_number}}</p>
                <p>Essenza:&nbsp;{{$pallet->species->name}}</p>
                <p>Classifica:&nbsp;{{$pallet->quality->name}}</p>
            </td>
            <td style="background: #fff; width: 40%"></td>
            <td style="text-align: right; background: #fff; font-weight: bold !important;">
                <div style="text-align: left">
                    <p>Cliete:&nbsp;{{$pallet->thickness}}</p>
                    <p>&nbsp;</p>
                    <p>Riferimento:&nbsp;{{\Carbon\Carbon::parse($pallet->created_at)->format('d/m/Y')}}</p>
                </div>
            </td>
        </tr>
        </tbody>
    </table>
</div>

