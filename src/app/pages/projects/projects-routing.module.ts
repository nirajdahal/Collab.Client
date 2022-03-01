import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsComponent } from './projects.component';
import { Test2Component } from './test2/test2.component';
import { TestprojectComponent } from './testproject/testproject.component';

const routes: Routes = [

  {
    path: '', component: ProjectsComponent, 
    children: [
      { path: 'test/:id', component: TestprojectComponent },
      { path: 'list', component: ProjectListComponent },
     
    ],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
