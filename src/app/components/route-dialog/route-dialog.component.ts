import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Route } from '../../types/TableData';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-route-dialog',
  templateUrl: './route-dialog.component.html',
  styleUrls: ['./route-dialog.component.css']
})
export class RouteDialogComponent implements OnInit {
  public routeFormGroup: FormGroup = new FormGroup({
    address: new FormControl('', [Validators.required, this.ipv4Validator]),
    mask: new FormControl('', Validators.required),
    gateway: new FormControl('', [Validators.required, this.ipv4Validator]),
    interface: new FormControl('')
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: {routes: Route[], selectedRoute?: Route}) { }

  ngOnInit(): void {
    this.patchFormGroupValue();
  }

  private ipv4Validator(control: FormControl): ValidationErrors | null {
    if (!control.value?.match(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/)) {
      return {ipv4Validator: 'Допускается только ввод корректных IPv4-адресов'};
    }
    return null;
  }

  private patchFormGroupValue(): void {
    if (this.data.selectedRoute) {
      this.routeFormGroup.patchValue({
        address: this.data.selectedRoute.address,
        mask: this.data.selectedRoute.mask,
        gateway: this.data.selectedRoute.gateway,
        interface: this.data.selectedRoute.interface
      })
    }
  }

}
