import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProjectDto } from 'src/app/@shared/models/projects/project';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  urlAddress = environment.apiUrl;
  constructor(private _http: HttpClient, private _jwtHelper: JwtHelperService) { }


  public getAllProjectsName = () => {

    
    return this._http.get<ProjectDto[]>(this.urlAddress + "project");
  }
}
