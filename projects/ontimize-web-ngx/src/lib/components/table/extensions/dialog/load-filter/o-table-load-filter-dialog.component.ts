import { SelectionModel } from '@angular/cdk/collections';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatListOption, MatSelectionList } from '@angular/material';

import { DialogService } from '../../../../../services/dialog.service';
import { OTableFiltersStatus } from '../../../../../types/o-table-filter-status.type';

@Component({
  selector: 'o-table-load-filter-dialog',
  templateUrl: './o-table-load-filter-dialog.component.html',
  styleUrls: ['./o-table-load-filter-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OTableLoadFilterDialogComponent implements OnInit {

  @ViewChild(MatSelectionList, { static: true }) filterList: MatSelectionList;

  filters: Array<OTableFiltersStatus> = [];

  onDelete: EventEmitter<string> = new EventEmitter();

  protected dialogService: DialogService;
  protected cd: ChangeDetectorRef;

  constructor(
    public dialogRef: MatDialogRef<OTableLoadFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: Array<OTableFiltersStatus>,
    protected injector: Injector
  ) {
    this.loadFilters(data);
    this.dialogService = this.injector.get(DialogService);
    try {
      this.cd = this.injector.get(ChangeDetectorRef);
    } catch (e) {
      // no parent form
    }
  }

  ngOnInit(): void {
    this.filterList.selectedOptions = new SelectionModel<MatListOption>(false);
  }

  loadFilters(filters: Array<OTableFiltersStatus>): void {
    this.filters = filters;
  }

  getSelectedFilterName(): string {
    const selected: MatListOption[] = this.filterList.selectedOptions.selected;
    return selected.length ? selected[0].value : void 0;
  }

  removeFilter(filterName: string): void {
    this.dialogService.confirm('CONFIRM', 'TABLE.DIALOG.CONFIRM_REMOVE_FILTER').then(result => {
      if (result) {
        this.onDelete.emit(filterName);
        this.cd.detectChanges();
      }
    });
  }

}
