import { Component, ViewChild, TemplateRef, Injector } from '@angular/core';
import { InputConverter } from '../../../../../decorators';
import { OIntegerPipe, IIntegerPipeArgument } from '../../../../../pipes';
import { OBaseTableCellRenderer } from '../o-base-table-cell-renderer.class';

export const DEFAULT_INPUTS_O_TABLE_CELL_RENDERER_INTEGER = [
  // grouping [no|yes]: grouping thousands. Default: yes.
  'grouping',
  // thousand-separator [string]: thousands separator when grouping. Default: comma (,).
  'thousandSeparator: thousand-separator'
];

@Component({
  selector: 'o-table-cell-renderer-integer',
  templateUrl: './o-table-cell-renderer-integer.component.html',
  inputs: DEFAULT_INPUTS_O_TABLE_CELL_RENDERER_INTEGER
})
export class OTableCellRendererIntegerComponent extends OBaseTableCellRenderer {

  public static DEFAULT_INPUTS_O_TABLE_CELL_RENDERER_INTEGER = DEFAULT_INPUTS_O_TABLE_CELL_RENDERER_INTEGER;

  @InputConverter()
  protected grouping: boolean = true;
  protected thousandSeparator: string = ',';
  protected componentPipe: OIntegerPipe;
  protected pipeArguments: IIntegerPipeArgument;

  @ViewChild('templateref', { read: TemplateRef }) public templateref: TemplateRef<any>;

  constructor(protected injector: Injector) {
    super(injector);
    this.tableColumn.type = 'integer';
    this.setComponentPipe();
  }

  setComponentPipe() {
    this.componentPipe = new OIntegerPipe(this.injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.pipeArguments = {
      grouping: this.grouping,
      thousandSeparator: this.thousandSeparator
    };
  }


}
