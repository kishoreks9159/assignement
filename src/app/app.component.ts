import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'practice';
  loading: boolean = false;
  detailForm: any;
  isFormApiProcessing: any;
  listData: number[] = [1];

  constructor(public formBuilder: FormBuilder) { }

  get f() { return this.detailForm.controls; }

  ngOnInit(): void {
    this.detailForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    })
  }
  onAdd() {
    console.log(this.listData);
    this.listData.length++;
  }

  onRemove(index:number) {
    this.listData.splice(index,1);
  }
  
  onSave() {

  }

}