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

  ngOnInit(): void {}

  viewEmployee(employeeId: any, fromTeamHead: boolean) {
    console.log(employeeId);
    this.actionEvent.emit({
      op: 'view',
      data: employeeId,
      fromTeamHead: fromTeamHead,
    });
  }

  editEmployee(employeeId: any, fromTeamHead: boolean) {
    console.log(employeeId);
    this.actionEvent.emit({
      op: 'edit',
      data: employeeId,
      fromTeamHead: fromTeamHead,
    });
  }

  addTeamMember(teamId: any) {
    this.actionEvent.emit({
      op: 'add',
      data: teamId,
      fromTeamHead: true,
    });
  }
}
