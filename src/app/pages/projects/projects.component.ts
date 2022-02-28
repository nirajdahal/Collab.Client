import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  template: ` <router-outlet></router-outlet> `,
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
