import { Component, Input, OnInit } from '@angular/core';
import { AppDataService } from '../app-data.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss'],
})
export class ViewEmployeeComponent implements OnInit {
  @Input() employee: any;

  constructor(private appData: AppDataService) {}

  ngOnInit(): void {}
}
