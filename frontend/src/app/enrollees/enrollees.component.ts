import { Component, OnInit } from '@angular/core';
import { Enrollee } from "@app/_models";
import { EnrolleeService } from "@app/_services";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-enrollees',
  templateUrl: './enrollees.component.html',
  styleUrls: ['./enrollees.component.css']
})
export class EnroleesComponent implements OnInit {

  enrollee: Enrollee;
  enrollees: Array<Enrollee>;
  enrolleeForm: FormGroup;
  options = [
    { value: true, text: 'True' },
    { value: false, text: 'False' }
  ];

  constructor(
    private enrolleeService: EnrolleeService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loadEnrollees();
    this.enrolleeForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      active: [false, Validators.required],
      dateOfBirth: ['']
    });
  }

  loadEnrollees() {
    this.enrolleeService.getEnrollees().subscribe(enrollees => {
      this.enrollees = enrollees;
    });
  }

  changeStatus($event) {
    this.enrolleeForm.controls['active'].setValue(
      $event.target.value === 'true' ? true : false
    );
  }

  onEdit(record) {
    this.enrolleeForm.setValue({
      id: record.id, name: record.name, active: record.active, dateOfBirth: record.dateOfBirth ? record.dateOfBirth : ''
    });
  }

  updateEnrollee() {
    this.enrolleeService.update(this.enrolleeForm.value)
      .subscribe(
        data => {
          this.enrolleeForm.reset();
          this.loadEnrollees();
        });
  }
}
