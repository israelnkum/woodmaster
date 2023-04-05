<?php

namespace App\View\Components;

use App\Models\Pallet;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class PrintHeader extends Component
{
    protected int $palletId;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($palletId)
    {
        $this->palletId = $palletId;
    }
    /**
     * Get the view / contents that represent the component.
     *
     * @return View|Closure|string
     */
    public function render(): View|string|Closure
    {
        $employee = Pallet::find($this->palletId);
        return view('components.print-header', compact('employee'));
    }
}
