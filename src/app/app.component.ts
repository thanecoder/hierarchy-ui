import { AppDataService, Employee, Team } from './app-data.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'hierarchy-ui';

  employees: Array<Employee> = [];
  teams: Array<Team> = [];
  employeesTeams: Array<any> = [];
  selectedTeamId: number = 0;
  selectedEmployee: any;
  viewMode: boolean = false;
  @ViewChild('viewEmployee') viewEmployee!: ViewEmployeeComponent;
  constructor(
    private appData: AppDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.appData.getEmployeesFromStorage();
    this.appData.getTeamsFromStorage();
    this.getEmployees();
    this.getTeams();
    this.getFormattedTeam();
    setInterval(() => {
      this.appData.saveTeamsToStorage();
      this.appData.saveEmployeesToStorage();
    }, 1000);
  }

  getEmployees() {
    this.employees = this.appData.getEmployees();
  }

  getTeams() {
    this.teams = this.appData.getTeams();
  }

  getFormattedTeam() {
    this.employeesTeams = JSON.parse(JSON.stringify(this.teams));
    this.employeesTeams.forEach((node) => {
      if (node.department == this.appData.DEPT_ORGANIZATION) {
        node.teamHeadDisplayName = 'CEO';
      } else if (node.teamHead) {
        node.teamHeadDisplayName = `Head of ${node.department}`;
      }
      node.teamMembers.forEach((teamMem: any, index: number) => {
        node.teamMembers[index] = this.employees[teamMem];
      });
      if (node.childTeams.length > 0 && node.teamId != 0) {
        let tempChildTeamsArr: any[] = [];
        node.childTeams.forEach((childTeam: any) => {
          tempChildTeamsArr.push(
            this.employeesTeams.filter((team) => childTeam == team.teamId)[0]
          );
          this.employeesTeams = this.employeesTeams.filter(
            (team) => childTeam != team.teamId
          );
        });
        node.childTeams = tempChildTeamsArr;
      }
    });
    this.cdr.detectChanges();
  }

  employeeAction(event: any) {
    console.log('event', event);
    let selectedEmployeeId = event.data;
    let fromTeamHead = event.fromTeamHead;
    if (event.op == 'view') {
      this.viewMode = true;
    } else {
      this.viewMode = false;
    }
    if (!fromTeamHead) {
      this.selectedEmployee = this.appData.getEmployee(selectedEmployeeId);
    } else {
      console.log('selectedEmployeeId', selectedEmployeeId);
      this.selectedEmployee = this.appData.getTeamHead(selectedEmployeeId);
      this.selectedTeamId = selectedEmployeeId;
    }
  }
}
