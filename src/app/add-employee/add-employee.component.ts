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
  teams: any;
  @Input() teamId!: number;
  @Input() fromCEO: boolean = false;
  @Input() fromTeamHead: boolean = false;
  @Input() fromTeamLead: boolean = false;
  @Output() newEmployeeEvent = new EventEmitter<string>();

  employeeForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    isTeamLead: [false],
    isTeamHead: [false],
    department: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private appData: AppDataService) {}

  ngOnInit(): void {
    this.teams = this.appData.getTeams();
    if (this.teams.length == 0) {
      this.employeeForm.controls['department'].patchValue(
        this.appData.DEPT_ORGANIZATION
      );
      this.employeeForm.controls['isTeamHead'].patchValue('true');
      this.employeeForm.controls['isTeamLead'].patchValue('false');
    }
  }

  addEmployee() {
    this.employeeForm.value.isTeamLead =
      this.employeeForm.value.isTeamLead == 'true' ? true : false;
    this.employeeForm.value.isTeamHead =
      this.employeeForm.value.isTeamHead == 'true' ? true : false;
    this.appData.addEmployee(this.employeeForm.value, this.teamId);
    this.newEmployeeEvent.emit('Employee Added');
    this.employeeForm.reset();
  }
}
