<?php

namespace App\Exports;

use App\Models\Pallet;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithPreCalculateFormulas;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;

class PalletWoodsExport implements FromCollection, WithHeadings,
    WithMapping, ShouldAutoSize, WithPreCalculateFormulas, WithEvents
{
    private Collection $data;

    private Pallet $pallet;

    private int $totalRows = 5;
    private int $end = 4;
    private int $start = 4;

    /**
     * @param $woodResource
     * @param $pallet
     */
    public function __construct($woodResource, $pallet)
    {
        $this->data = $woodResource;
        $this->pallet = $pallet;
    }

    /**
     * @return Collection
     */
    public function collection(): Collection
    {
        return $this->data;
    }

    /**
     * @return string[]
     */
    public function headings(): array
    {
        $headers = [];

        $headers[] = [
            'SEPARATE MEASUREMENT'
        ];
        $headers[] = [
            'Pallet Number: ' . $this->pallet->pallet_number . '                              THICKNESS: ' . $this->pallet->thickness
        ];
        $headers[] = [
            'SPECIES: ' . $this->pallet->species->name . '                                         '
        ];

        $headers[] = [
            'QUALITY: ' . $this->pallet->quality->name . '                              DATE: ' . Carbon::parse($this->pallet->created_at)->format('m d Y')
        ];

        $headers[] = [
            'Log/Sub Log',
            'Number',
            'Sheets',
            'Length (cm)',
            'Width (cm)',
            'Square Meter(mq)'
        ];

        return $headers;
    }

    /**
     * @param $row
     * @return array
     */
    public function map($row): array
    {
        $rows = [];

        foreach ($row as $woods) {
            foreach ($woods as $subLog) {
                $rows [] = [
                    $subLog->palletLog->log_number . '/' . $subLog->sub_log,
                    $subLog->number,
                    $subLog->sheets,
                    $subLog->length,
                    $subLog->width,
                    $subLog->square_meter
                ];

                ++$this->totalRows;
            }

            $this->start = $this->end + 2;

            $this->end += count($woods) + 1;

            $rows[] = ['', '', '', '', 'Total Square Meter', '=SUM(F' . $this->start . ':F' . $this->end . ')'];

            ++$this->totalRows;
        }

        return $rows;
    }

    public function registerEvents(): array
    {
        $columns = ['A', 'B', 'C', 'D', 'E', 'F'];
        return [
            AfterSheet::class => function (AfterSheet $event) use ($columns) {
                // merge cells
                for ($i = 1; $i < 5; $i++) {
                    $event->sheet->mergeCells('A' . $i . ':F' . $i);
                }

                foreach ($columns as $column) {
                    $event->sheet->getStyle('A1:' . $column . $this->totalRows)->applyFromArray([
                        'borders' => [
                            'right' => [
                                'borderStyle' => Border::BORDER_THIN,
                                'color' => ['rgb' => '000000']
                            ],
                            'left' => [
                                'borderStyle' => Border::BORDER_THIN,
                                'color' => ['rgb' => 'FFFFFF']
                            ]
                        ]
                    ]);
                }

                for ($i = 1; $i < $this->totalRows; $i++) {
                    $event->sheet->getStyle('A1:F' . $i)->applyFromArray([
                        'borders' => [
                            'bottom' => [
                                'borderStyle' => Border::BORDER_THIN,
                                'color' => ['rgb' => 'FFFFFF']
                            ]
                        ]
                    ]);

                    $event->sheet->getStyle('A1:F' . $i)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
                }

                $event->sheet->getStyle('A4:A4')->applyFromArray([
                    'borders' => [
                        'bottom' => [
                            'borderStyle' => Border::BORDER_THIN,
                            'color' => ['rgb' => '000000']
                        ]
                    ]
                ]);

                foreach ($columns as $column) {
                    $event->sheet->getStyle($column . '5:' . $column . '5')->applyFromArray([
                        'borders' => [
                            'bottom' => [
                                'borderStyle' => Border::BORDER_THIN,
                                'color' => ['rgb' => '000000']
                            ]
                        ]
                    ]);
                }
            }
        ];
    }
}
