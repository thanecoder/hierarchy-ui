import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-view-hierarchy',
  templateUrl: './view-hierarchy.component.html',
  styleUrls: ['./view-hierarchy.component.scss'],
})
export class ViewHierarchyComponent implements OnInit {
  @Input() employeesTeams: Array<any> = [];
  @Output() actionEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    console.log('employeeTeams', this.employeesTeams);
  }

  viewEmployee(employeeId: any) {
    console.log(employeeId);
    this.actionEvent.emit({ op: 'view', data: employeeId });
  }

  editEmployee(employeeId: any) {
    console.log(employeeId);
    this.actionEvent.emit({ op: 'edit', data: employeeId });
  }

  addTeamMember() {}
}
