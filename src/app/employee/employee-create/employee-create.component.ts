import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css'],

})
export class EmployeeCreateComponent implements OnInit {

  @Input() formsMode: any;
  @Input() employee: any;
  detailForm: FormGroup | any;
  details: any
  constructor(
    public fb: FormBuilder,
    public service: ServiceService,
    private config: DynamicDialogConfig,
    public ref: DynamicDialogRef
   

  ) {
    this.formsMode = this.config?.data?.formsMode;
    this.employee = this.config?.data?.employee;
  }

  ngOnInit(): void {
    this.detailForm = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      colour: ['', [Validators.required]],
    })

    if (this.formsMode === "edit") {
      this.getData(this.employee);
    }
  }

  getData(employee: any) {
    this.service.getUnicornById(employee._id).subscribe({
      next: (response: any) => {
        this.details = response;
        this.detailForm.patchValue({
          _id: response._id,
          name: response.name,
          age: response.age,
          colour: response.colour,
        });
      },
      error: (error: any) => {
        alert(error.message);
      },
      complete: () => {
      }
    });
  }

  onSave() {
    if (!this.detailForm.valid) {
      alert('Something went wrong.');
      return;
    }
    let formdata = this.detailForm.value;
    const unicornData = formdata;
    if (this.formsMode === "create") {
      this.service.createUnicorn(unicornData).subscribe({
        next: (response: any) => {
          alert('Create Successfully');
          this.ref.close(false);
        },
        error: (error: any) => {
          alert(error.message);
        },
        complete: () => {
        }
      });
    } else {
      this.service.updateUnicorn(this.employee._id, unicornData).subscribe({
        next: (response: any) => {
          alert('Updated Successfully');
          this.ref.close(false);
        },
        error: (error: any) => {
          alert(error.message);
        },
        complete: () => {
        }
      });
    }
  }

  onCancel() {
    this.ref.close(false);
  }

}