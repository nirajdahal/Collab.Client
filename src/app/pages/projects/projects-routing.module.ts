import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { TestprojectComponent } from './testproject/testproject.component';

const routes: Routes = [

  {
    path: '', component: ProjectsComponent, 
    children: [
      { path: 'test', component: TestprojectComponent },
     
    ],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
