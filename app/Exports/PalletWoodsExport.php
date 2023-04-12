<?php

namespace App\Exports;

use App\Models\Pallet;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithPreCalculateFormulas;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeExport;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;

class PalletWoodsExport implements FromCollection, WithHeadings,
    WithMapping, ShouldAutoSize, WithPreCalculateFormulas, WithEvents
{
    use Exportable;

    private Collection $data;

    private Pallet $pallet;

    private int $totalRows = 5;

    private int $end = 4;

    private array $totalCells;

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
            'DISTINTAN MISURAZIONE'
        ];
        $headers[] = [
            'Pedana: ' . $this->pallet->pallet_number . 'Cliete' . $this->pallet->thickness
        ];
        $headers[] = [
            'Essenza: ' . $this->pallet->species->name . '                                         '
        ];

        $headers[] = [
            'Classifica: ' . $this->pallet->quality->name . '                              Riferimento: ' . Carbon::parse($this->pallet->created_at)->format('m d Y')
        ];

        $headers[] = [
            'Tronco/Biglia',
            'Numbero Pacco',
            'Numbero Fogli',
            'Lunghezza(cm)',
            'Larghezza (cm)',
            'Superficie (mq)'
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

            $counter = $this->end + 2;
            foreach ($woods as $subLog) {
                $rows [] = [
                    $subLog->palletLog->log_number . '/' . $subLog->sub_log,
                    $subLog->number,
                    $subLog->sheets,
                    $subLog->length,
                    $subLog->width,
//                    $subLog->square_meter
                    '=ROUND((C' . $counter . '*D' . $counter . '*E' . $counter . ')/10000, 2)'
                ];

                $counter++;
                ++$this->totalRows;
            }

            $start = $this->end + 2;
            $this->end += count($woods) + 1;

            $this->totalCells[] = 'F' . $this->end + 1;

            $rows[] = [
                '',
                '',
                '',
                '',
                'Superficie Totale Biglia',
                '=ROUND(SUM(F' . $start . ':F' . $this->end . '), 2)'
            ];

            ++$this->totalRows;
        }

        return $rows;
    }

    public function registerEvents(): array
    {
        $columns = ['A', 'B', 'C', 'D', 'E', 'F'];
        return [
            BeforeExport::class => function (BeforeExport $event) {
                $event->writer->getProperties()->setCreator('TechLineAfrica');
            },
            AfterSheet::class => function (AfterSheet $event) use ($columns) {
                // merge cells
                for ($i = 1; $i < 5; $i++) {
                    $event->sheet->mergeCells('A' . $i . ':F' . $i);
                }

                foreach ($columns as $column) {
                    $event->sheet->getStyle('A1:' . $column . $this->totalRows + 2)->applyFromArray([
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

                for ($i = 1; $i < $this->totalRows + 3; $i++) {
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

                $highestRow = ($event->sheet->getHighestRow());
                $event->sheet->setCellValue('E' . $highestRow, 'Superficie Totale')
                    ->setCellValue('F' . $highestRow, '=ROUND(SUM(' . implode(',', $this->totalCells) . '), 2)');
            }
        ];
    }
}
