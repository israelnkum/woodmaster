<?php

namespace App\Exports;

use App\Models\Pallet;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
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

    private int $end = 6;

    private array $totalCells;

    private array $headers;

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
        $this->addHeader(['DISTINTAN MISURAZIONE'])
            ->addHeader([
                'Pedana: ' . $this->pallet->pallet_number,
                '',
                '',
                '',
                'Cliete: ' . $this->pallet->thickness,
                ''
            ])
            ->addHeader(['Essenza: ' . $this->pallet->species->name])
            ->addHeader([
                'Classifica: ' . $this->pallet->quality->name,
                '',
                '',
                '',
                'Riferimento: ' . Carbon::parse($this->pallet->created_at)->format('m d Y'),
                ''
            ])
            ->addHeader([
                '',
                '',
                '',
                '',
                '',
                ''
            ])
            ->addHeader([
                'Tronco/Biglia',
                'Numbero',
                'Numbero',
                'Lunghezza',
                'Larghezza',
                'Superficie'
            ])->addHeader([
                '',
                'Pacco',
                'Fogli',
                '(cm)',
                '(cm)',
                '(mq)'
            ]);

        return $this->headers;
    }

    /**
     * @param array $columns
     * @return $this
     */
    public function addHeader(array $columns): static
    {
        $this->headers[] = $columns;

        return $this;
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
                'Superficie Totale Biglia',
                '',
                '',
                '',
                '',
                '=ROUND(SUM(F' . $start . ':F' . $this->end . '), 2)'
            ];
            $this->end++;
            $rows[] = [];
            ++$this->totalRows;
        }

        return $rows;
    }

    public function registerEvents(): array
    {
        return [
            BeforeExport::class => function (BeforeExport $event) {
                $event->writer->getProperties()->setCreator('TechLineAfrica');
            },
            AfterSheet::class => function (AfterSheet $event) {
                $columns = ['A', 'B', 'C', 'D', 'E', 'F'];

                $event->sheet->mergeCells('A1:F1');
                $event->sheet->mergeCells('A2:B2');
                $event->sheet->mergeCells('E2:F2');
                $event->sheet->mergeCells('A3:B3');
                $event->sheet->mergeCells('E3:F3');
                $event->sheet->mergeCells('A4:B4')
                    ->getStyle('A4:B4')
                    ->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);
                $event->sheet->mergeCells('E4:F4')->getStyle('E:F')
                    ->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);

                for ($i = 1; $i < 6; $i++) {
                    $event->sheet->getStyle('A' . $i . ':F' . $i)->getFont()->setBold(true);
                }


                foreach ($this->totalCells as $cell) {
                    $cellNumber = (int)filter_var($cell, FILTER_SANITIZE_NUMBER_INT);
                    $event->sheet->mergeCells('A' . $cellNumber . ':E' . $cellNumber)
                        ->getStyle('A' . $cellNumber . ':E' . $cellNumber)
                        ->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

                    $event->sheet->mergeCells('A' . $cellNumber . ':E' . $cellNumber)
                        ->getStyle('A' . $cellNumber . ':E' . $cellNumber)
                        ->getFont()->setBold(true);

                    $event->sheet->getStyle('A' . $cellNumber + 1 . ':F' . $cellNumber + 1)->applyFromArray($this->setAllBorders('FFFFFF'));

//
                    $event->sheet->getStyle('E' . $cellNumber)->getFont()->setBold(true);
                    $event->sheet->getStyle($cell)->getFont()->setBold(true)->setUnderline(true);
//
                }

                $a = 1;
                foreach ($columns as $column) {

                    Log::info($column . $a . ':' . $column . $a);
                    $event->sheet->getStyle($column . $a . ':' . $column . $a)->applyFromArray([
                        'borders' => [
                            'allBorders' => [
                                'borderStyle' => Border::BORDER_THIN,
                                'color' => ['rgb' => 'FFFFFF']
                            ]
                        ]
                    ]);

                    $a++;
                    $event->sheet->getStyle('A5:' . $column . $this->totalRows + 6)->applyFromArray([
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

                    $event->sheet->getStyle('A1:' . $column . $this->totalRows + 6)->getFont()->setName('TimesNewRoman');
                }

                $event->sheet->getStyle('A1')->getFont()->setUnderline(true);

                for ($i = 1; $i < $this->totalRows + 8; $i++) {
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
                    $event->sheet->getStyle($column . '6:' . $column . '6')->applyFromArray([
                        'borders' => [
                            'bottom' => [
                                'borderStyle' => Border::BORDER_THIN,
                                'color' => ['rgb' => '000000']
                            ]
                        ]
                    ]);
                    $event->sheet->getStyle($column . '6:' . $column . '6')->getFont()->setBold(true);

                }

                $highestRow = ($event->sheet->getHighestRow()) + 2;
                $event->sheet->setCellValue('A' . $highestRow, 'Superficie Totale');
                $event->sheet->mergeCells('A' . $highestRow . ':E' . $highestRow)
                    ->getStyle('A' . $highestRow . ':E' . $highestRow)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
                $event->sheet->setCellValue('F' . $highestRow,
                    '=ROUND(SUM(' . implode(',', $this->totalCells) . '), 2)')
                    ->getStyle('F' . $highestRow)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
                $event->sheet->getStyle('A' . $highestRow . ':F' . $highestRow)->getFont()->setBold(true);
                $event->sheet->getStyle('A' . $highestRow . ':F' . $highestRow)->getFont()->setName('TimesNewRoman');
                $event->sheet->getStyle('F' . $highestRow)->getFont()->setUnderline(true);
                $event->sheet->getStyle('A' . $highestRow . ':E' . $highestRow)->applyFromArray([
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => Border::BORDER_THIN,
                            'color' => ['rgb' => 'FFFFFF']
                        ]
                    ]
                ]);
                $event->sheet->getStyle('F' . $highestRow)->applyFromArray($this->setAllBorders('#000000'));
            }
        ];
    }

    public function setAllBorders(string $color): array
    {
        return [
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => $color]
                ]
            ]
        ];
    }
}
