import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  ViewEncapsulation,
} from '@angular/core';

import { InputConverter } from '../../../../../decorators/input-converter';

export const DEFAULT_INPUTS_O_TABLE_OPTION = [
  'oattr: attr',
  'enabled',
  'icon',
  // show-active-icon [string][yes|no|true|false]: show icon when option is active. Default :no.
  'showActiveIcon : show-active-icon',
  'olabel: label',
  'active'
];

export const DEFAULT_OUTPUTS_O_TABLE_OPTION = [
  'onClick'
];

@Component({
  selector: 'o-table-option',
  templateUrl: './o-table-option.component.html',
  styleUrls: ['./o-table-option.component.scss'],
  inputs: DEFAULT_INPUTS_O_TABLE_OPTION,
  outputs: DEFAULT_OUTPUTS_O_TABLE_OPTION,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.o-table-option]': 'true',
  }
})

export class OTableOptionComponent {

  public static O_TABLE_OPTION_ACTIVE_CLASS = 'o-table-option-active';

  onClick: EventEmitter<object> = new EventEmitter<object>();

  oattr: string;
  @InputConverter()
  enabled: boolean = true;
  icon: string;
  olabel: string;
  @InputConverter()
  showActiveIcon: boolean = false;
  @InputConverter()
  active: boolean = false;

  cd: ChangeDetectorRef;

  constructor(
    protected injector: Injector,
    public elRef: ElementRef
  ) {
    try {
      this.cd = this.injector.get(ChangeDetectorRef);
    } catch (e) {
    }
  }

  innerOnClick() {
    this.onClick.emit();
    this.setActive(!this.active);
  }

  showActiveOptionIcon() {
    return this.showActiveIcon && this.active;
  }

  setActive(val: boolean) {
    this.active = val;
    this.cd.detectChanges();
  }

}
