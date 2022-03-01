import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/@core/services/projects/project.service';
import { IProjectDto } from 'src/app/@shared/models/projects/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  constructor(private projectService: ProjectService) { }

  projectList : IProjectDto[] = []
  ngOnInit(): void {
    this.projectService.getAllProjectsName().subscribe(proj => {
      this.projectList = proj;
      console.log("", this.projectList)
      
    })
  }
}
