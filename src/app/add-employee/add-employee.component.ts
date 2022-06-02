import { Employee } from './../app-data.service';
import { AppDataService } from '../app-data.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  @Input() teamId!: number;
  @Output() newEmployeeEvent = new EventEmitter<string>();

  employeeForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    isTeamLead: [false, [Validators.required]],
    isTeamHead: [false, [Validators.required]],
    department: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private appData: AppDataService) {}

  ngOnInit(): void {
    let teams = this.appData.getTeams();
    if (teams.length == 0) {
      this.employeeForm.controls['department'].patchValue(
        this.appData.DEPT_ORGANIZATION
      );
      this.employeeForm.controls['department'].disabled;
    }
  }

  addEmployee() {
    console.log('this.employeeForm.value', this.employeeForm.value);
    console.log('this.teamId', this.teamId);
    this.employeeForm.value.isTeamLead =
      this.employeeForm.value.isTeamLead == 'true' ? true : false;
    this.employeeForm.value.isTeamHead =
      this.employeeForm.value.isTeamHead == 'true' ? true : false;
    this.appData.addEmployee(this.employeeForm.value, this.teamId);
    this.newEmployeeEvent.emit('Employee Added');
  }
}
