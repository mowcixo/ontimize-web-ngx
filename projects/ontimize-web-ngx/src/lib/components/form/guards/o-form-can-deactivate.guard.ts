import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Codes } from '../../../util/codes';
import { OFormComponent } from '../o-form.component';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateFormGuard implements CanDeactivate<CanComponentDeactivate> {
  oForm: OFormComponent;
  public static CLASSNAME = 'CanDeactivateFormGuard';

  canDeactivate(component: CanComponentDeactivate, curr: ActivatedRouteSnapshot, state: RouterStateSnapshot, future: RouterStateSnapshot) {
    const futureQueryParams = future.root.queryParams;
    if (futureQueryParams.hasOwnProperty(Codes.IGNORE_CAN_DEACTIVATE)) {
      return true;
    }
    if (this.oForm) {
      return this.oForm.canDeactivate();
    }
    return true;
  }

  setForm(form: OFormComponent) {
    this.oForm = form;
  }
}

