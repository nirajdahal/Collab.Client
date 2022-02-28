import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { TestprojectComponent } from './testproject/testproject.component';
import { SharedModule } from 'src/app/@shared/shared.module';


@NgModule({
  declarations: [
    ProjectsComponent,
    TestprojectComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
