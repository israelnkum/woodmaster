<?php

namespace App\Imports;

use App\Models\Department;
use App\Models\Employee;
use App\Models\Rank;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithProgressBar;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class EmployeeImport implements ToModel, WithHeadingRow, WithProgressBar
{
    use Importable;

    /**
     * @param array $row
     *
     * @return Employee
     */
    public function model(array $row): Employee
    {
        $rank = null;

        if ($row['rank'] && $row['rank'] !== '') {
            $rank = (new Rank)->firstOrCreate([
                'name' => $row['rank']
            ]);
        }

        $gtec_placement = null;

        if ($row['gtec_placement'] && $row['gtec_placement'] !== '') {
            $gtec_placement = Rank::firstOrCreate([
                'name' => $row['gtec_placement']
            ]);
        }

        $department = Department::firstOrCreate([
            'name' => $row['department']
        ]);

        $employee = Employee::updateOrCreate([
            'first_name' => $row['first_name'] ?: '',
            'middle_name' => $row['middle_name'] ?: '',
            'last_name' => $row['last_name'] ?: '',
            'staff_id' => $row['staff_id'] ?: '',
        ], [
            'title' => $row['title'] ?: '',
            'first_name' => $row['first_name'] ?: '',
            'middle_name' => $row['middle_name'] ?: '',
            'last_name' => $row['last_name'] ?: '',
            'staff_id' => $row['staff_id'] ?: '',
            'dob' => Carbon::parse(Date::excelToDateTimeObject($row['date_of_birth']))->format('Y-m-d'),
            'gender' => $row['gender'] ?: '',
            'ssnit_number' => $row['ssnit_no'] ?: '',
            'gtec_placement' => $gtec_placement?->id,
            'qualification' => $row['qualification'] ?: '',
            'senior_staff' => $row['senior_staff'] ?? false,
            'senior_member' => $row['senior_member'] ?? false,
            'junior_staff' => $row['junior_staff'] ?? false,
            'secondment_staff' => $row['secondment_staff'] ?? false,
            'rank_id' => $rank->id,
            'department_id' => $department->id,
            'user_id' => 1
        ]);

        $employee->contactDetail()->create([
            'telephone' => $row['phone_number'] ?: '',
            'work_telephone' => $row['other_phone_number'] ?: '',
            'work_email' => $row['work_email'] ?: '',
            'other_email' => $row['personal_email'] ?: '',
            'user_id' => 1,
        ]);

        $employee->jobDetail()->create([
            'status' => $row['status']
        ]);

        return $employee;
    }
}
