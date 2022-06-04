import { Injectable } from '@angular/core';

export interface Employee {
  name: string;
  id: number;
  phone: string;
  email: string;
  isTeamHead: boolean;
  isTeamLead: boolean;
  department: string;
}

export interface Team {
  teamId: number;
  teamHead: number;
  department: string;
  teamMembers: Array<number>;
  childTeams: Array<number>;
}

@Injectable({
  providedIn: 'root',
})
export class AppDataService {
  DEPT_ORGANIZATION: string = 'ORGANIZATION';
  public employees: Array<Employee> = [];
  public teams: Array<Team> = [];

  constructor() {}

  getEmployees() {
    return this.employees;
  }

  getTeams() {
    return this.teams;
  }

  addEmployee(employee: Employee, teamId: number) {
    employee.id = this.employees.length == 0 ? 0 : this.employees.length;
    if (employee.id == 0 && this.teams.length == 0) {
      this.addEmployeeToTeam(
        employee.id,
        teamId,
        true,
        false,
        this.DEPT_ORGANIZATION
      );
    } else {
      this.addEmployeeToTeam(
        employee.id,
        teamId,
        employee.isTeamHead,
        employee.isTeamLead,
        employee.department
      );
    }
    this.employees.push(employee);
  }

  editEmployee(employee: Employee, employeeId: number) {
    this.employees.forEach((emp) => {
      if (emp.id == employeeId) {
        emp.name = employee.name;
        emp.department = employee.department;
        emp.phone = employee.phone;
        emp.email = employee.email;
      }
    });
  }

  addEmployeeToTeam(
    employeeId: number,
    teamId: number,
    isTeamHead: boolean,
    isTeamLead: boolean,
    department: any
  ) {
    let currentTeam = this.teams.filter((team) => team.teamId == teamId);
    if (teamId == 0 && currentTeam.length == 0) {
      this.teams.push({
        teamId: this.employees.length == 0 ? 0 : this.employees.length,
        teamHead: employeeId,
        department: department,
        teamMembers: [],
        childTeams: [],
      });
    } else {
      if (isTeamHead || isTeamLead) {
        let newTeamId = this.teams.length;
        this.teams.push({
          teamId: newTeamId,
          teamHead: employeeId,
          department: department,
          teamMembers: isTeamLead ? [employeeId] : [],
          childTeams: [],
        });
        if (currentTeam[0].teamId == 0) {
          currentTeam[0].teamMembers.push(employeeId);
        }
        currentTeam[0].childTeams.push(newTeamId);
      } else {
        currentTeam[0].teamMembers.push(employeeId);
      }
    }
  }

  getEmployee(selectedEmployee: any) {
    return this.employees.filter((emp) => emp.id == selectedEmployee)[0];
  }

  saveEmployeesToStorage() {
    localStorage.setItem('employees', JSON.stringify(this.employees));
  }

  saveTeamsToStorage() {
    localStorage.setItem('teams', JSON.stringify(this.teams));
  }

  getEmployeesFromStorage() {
    const emps = localStorage.getItem('employees');
    if (emps) {
      this.employees = JSON.parse(emps);
    }
  }

  getTeamsFromStorage() {
    const teams = localStorage.getItem('teams');
    if (teams) {
      this.teams = JSON.parse(teams);
    }
  }

  getTeamHead(teamId: any) {
    if (teamId != null) {
      let selectedTeamHead = this.teams.filter(
        (team) => team.teamId == teamId
      )[0].teamHead;
      let selectedEmployee = this.employees.filter(
        (emp) => emp.id == selectedTeamHead
      )[0];
      return selectedEmployee;
    } else {
      return {};
    }
  }

  getTeamId(employeeId: any) {
    let teamId = -1;
    for (let i = 0; i < this.teams.length; i++) {
      if (this.teams[i].teamHead == employeeId) {
        teamId = this.teams[i].teamId;
      }
    }
    return teamId;
  }
}
