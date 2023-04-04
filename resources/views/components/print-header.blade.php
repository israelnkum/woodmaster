<!-- Nothing worth having comes easy. - Theodore Roosevelt -->
<div>
    <table>
        <tbody>
        <tr >
            <td style="background: #fff">
                Photo
            </td>
            <td style="background: #fff; width: 40%"></td>
            <td  style="text-align: right; background: #fff; line-height: 0.2;">
                <div style="text-align: left">
                    <h3>{{$employeeResource->department->name}}</h3>
                    <p><b>Phone:</b> {{$employeeResource->telephone}}</p>
                    <p><b>Email:</b> {{$employeeResource->work_email}}</p>
                    <p><b>Staff ID:</b> {{$employeeResource->staff_id}}</p>
                </div>
            </td>
        </tr>
        </tbody>
    </table>
    <div style=" display: flex !important; justify-content: space-between !important;">
    </div>
</div>

