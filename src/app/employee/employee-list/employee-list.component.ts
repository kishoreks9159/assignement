import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { EmployeeCreateComponent } from '../employee-create/employee-create.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {

  employee_list: any
  loading: boolean = false;
  totalRecords: number = 5;
  constructor(
    public service: ServiceService,
    private dialog_service: DialogService,
  ) { }

  ngOnInit(): void {
    this.loadState();
  }

  loadState() {
    this.loading = true;
    this.service.getAllUnicorns().subscribe({
      next: (response: any) => {
        this.employee_list = response;
        this.loading = false;
      },
      error: (error: any) => {
        alert(error.message);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  addNeweditEmployeeCost(form_mode?: any, employee?: string) {
    document.body.classList.add('no-scroll');
    const ref = this.dialog_service.open(EmployeeCreateComponent, {
      header: form_mode === "create" ? 'Add' : 'Edit',
      width: '50%',
      contentStyle: { "overflow": "auto" },
      data: {
        showNewClientLabel: false,
        formsMode: form_mode,
        employee: employee ? employee : ''
      },
    });
    ref.onClose.subscribe(() => {
      this.loadState();
    });
  }


  deleteEmployee(employee: any) {
    this.service.deleteUnicorn(employee).subscribe({
      next: (response: any) => {
        alert('Record deleted successfully!');
        this.loading = true;
        this.loadState();
      },
      error: (error: any) => {
        alert(error.message);
        this.loading = false;      },
      complete: () => {
      }
    });

  }
  
  onCancelDelete(): void {
    console.log('Delete canceled');
  }
}
