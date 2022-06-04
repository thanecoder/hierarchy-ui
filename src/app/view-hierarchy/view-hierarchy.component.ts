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

  ngOnInit(): void {}

  viewEmployee(employeeId: any, fromTeamHead: boolean) {
    this.actionEvent.emit({
      op: 'view',
      data: employeeId,
      fromCEO: false,
      fromTeamHead: fromTeamHead,
      fromTeamLead: false,
    });
  }

  addTeamMember(teamId: any, fromCEO: boolean, fromTeamHead: boolean) {
    this.actionEvent.emit({
      op: 'add',
      data: teamId,
      fromCEO: fromCEO,
      fromTeamHead: fromTeamHead,
      fromTeamLead: false,
    });
  }

  addTeamMemberToTeamLead(employeeId: any) {
    let teamId = this.appData.getTeamId(employeeId);
    this.actionEvent.emit({
      op: 'add',
      data: teamId,
      fromCEO: false,
      fromTeamHead: false,
      fromTeamLead: true,
    });
  }
}
