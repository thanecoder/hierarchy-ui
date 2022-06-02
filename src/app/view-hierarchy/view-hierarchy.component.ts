import { AppDataService } from './../app-data.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-view-hierarchy',
  templateUrl: './view-hierarchy.component.html',
  styleUrls: ['./view-hierarchy.component.scss'],
})
export class ViewHierarchyComponent implements OnInit {
  @Input() employeesTeams: Array<any> = [];
  @Output() actionEvent = new EventEmitter<any>();

  constructor(private appData: AppDataService) {}

  ngOnInit(): void {
    // console.log('employeesTeams', this.employeesTeams);
  }

  viewEmployee(employeeId: any, fromTeamHead: boolean) {
    // console.log(employeeId);
    this.actionEvent.emit({
      op: 'view',
      data: employeeId,
      fromTeamHead: fromTeamHead,
    });
  }

  editEmployee(employeeId: any, fromTeamHead: boolean) {
    // console.log(employeeId);
    this.actionEvent.emit({
      op: 'edit',
      data: employeeId,
      fromTeamHead: fromTeamHead,
    });
  }

  addTeamMember(teamId: any) {
    // console.log('teamId', teamId);
    this.actionEvent.emit({
      op: 'add',
      data: teamId,
      fromTeamHead: true,
    });
  }

  addTeamMemberToTeamLead(employeeId: any) {
    // console.log('employeeId', employeeId);
    let teamId = this.appData.getTeamId(employeeId);
    // console.log('addTeamMemberToTeamLead teamId', teamId);
    this.actionEvent.emit({
      op: 'add',
      data: teamId,
      fromTeamHead: true,
    });
  }
}
