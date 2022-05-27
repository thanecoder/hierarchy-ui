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
  public employees: Array<Employee> = [
    {
      name: 'ABC',
      id: 0,
      phone: '989898989',
      email: 'abc@email.com',
      isTeamHead: true,
      isTeamLead: false,
      department: this.DEPT_ORGANIZATION,
    },
    {
      name: 'DEF',
      id: 1,
      phone: '1234567890',
      email: 'DEF@EMAIL.COM',
      isTeamHead: true,
      isTeamLead: false,
      department: 'Staff/HR',
    },
    {
      name: 'PQR',
      id: 2,
      phone: '22222222222',
      email: 'PQR@email.com',
      isTeamHead: true,
      isTeamLead: false,
      department: 'Engineering',
    },
    {
      name: 'XYZ',
      id: 3,
      phone: '98989889787',
      email: 'XYZ@EMAIL.COM',
      isTeamHead: false,
      isTeamLead: true,
      department: 'Staff/HR',
    },
    {
      name: 'QWE',
      id: 4,
      phone: '444444444',
      email: 'QWE@EMAIL.COM',
      isTeamHead: false,
      isTeamLead: false,
      department: 'Staff/HR',
    },
    {
      name: 'QWE',
      id: 5,
      phone: '444444444',
      email: 'QWE@EMAIL.COM',
      isTeamHead: false,
      isTeamLead: true,
      department: 'Engineering',
    },
    {
      name: 'QWE',
      id: 6,
      phone: '444444444',
      email: 'QWE@EMAIL.COM',
      isTeamHead: false,
      isTeamLead: false,
      department: 'Engineering',
    },
    {
      name: 'QWE',
      id: 7,
      phone: '444444444',
      email: 'QWE@EMAIL.COM',
      isTeamHead: false,
      isTeamLead: true,
      department: 'Engineering',
    },
    {
      name: 'QWE',
      id: 8,
      phone: '444444444',
      email: 'QWE@EMAIL.COM',
      isTeamHead: false,
      isTeamLead: false,
      department: 'Engineering',
    },
  ];
  public teams: Array<Team> = [
    {
      teamId: 0,
      teamHead: 0,
      department: this.DEPT_ORGANIZATION,
      teamMembers: [1, 2],
      childTeams: [1, 2],
    },
    {
      teamId: 1,
      teamHead: 1,
      department: 'Staff/HR',
      teamMembers: [3, 4],
      childTeams: [],
    },
    {
      teamId: 2,
      teamHead: 2,
      department: 'Engineering',
      teamMembers: [],
      childTeams: [3, 4],
    },
    {
      teamId: 3,
      teamHead: 2,
      department: 'Engineering',
      teamMembers: [5, 6],
      childTeams: [],
    },
    {
      teamId: 4,
      teamHead: 2,
      department: 'Engineering',
      teamMembers: [7, 8],
      childTeams: [],
    },
  ];

  constructor() {}

  getEmployees() {
    return this.employees;
  }

  getTeams() {
    return this.teams;
  }

  addEmployee(employee: Employee, teamId: number) {
    employee.id = this.employees.length == 0 ? 0 : this.employees.length;
    this.addEmployeeToTeam(employee.id, teamId);
    this.employees.push(employee);
  }

  addEmployeeToTeam(employeeId: number, teamId: number) {
    if (teamId == 0) {
      this.teams.push({
        teamId: 0,
        teamHead: 0,
        department: this.DEPT_ORGANIZATION,
        teamMembers: [],
        childTeams: [],
      });
    }
    this.teams[teamId].teamMembers.push(employeeId);
  }

  getEmployee(selectedEmployee: any) {
    return this.employees.filter((emp) => emp.id == selectedEmployee)[0];
  }
}
