import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { TestprojectComponent } from './testproject/testproject.component';
import { SharedModule } from 'src/app/@shared/shared.module';
import { Test2Component } from './test2/test2.component';
import { ProjectListComponent } from './project-list/project-list.component';


@NgModule({
  declarations: [
    ProjectsComponent,
    TestprojectComponent,
    Test2Component,
    ProjectListComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
