import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

import { OTableComponent } from '../components/table/o-table.component';
import { Expression } from '../types/expression.type';

export interface OTableColumn {
  attr: string;
  title: string;
  type: string;
  table: OTableComponent;
  editor: any;
  renderer: any;
  multiline: boolean;
  orderable: boolean;
  searchable: boolean;
  resizable: boolean;
  titleAlign: string;
  contentAlign: string;
  container: ViewContainerRef;
  showPlaceHolder: boolean;
  width: string;
  minWidth: string;
  maxWidth: string;
  originalWidth: string;
  class: string;
  tooltip: boolean;
  tooltipValue: string;
  tooltipFunction: (rowData: any) => any;
  filterExpressionFunction: (columnAttr: string, quickFilter?: string) => Expression;
  getSQLType: () => number;
  buildCellEditor: (type: string, resolver: ComponentFactoryResolver, container: ViewContainerRef, propsOrigin: any) => any;
  registerEditor: (editor: any) => void;
  registerRenderer: (editor: any) => void;
}
