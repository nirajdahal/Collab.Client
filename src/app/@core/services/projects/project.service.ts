import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IProjectDto, IProjectStatus } from 'src/app/@shared/models/projects/project';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  urlAddress = environment.apiUrl;
  constructor(private _http: HttpClient, private _jwtHelper: JwtHelperService) { }


  public getAllProjectsName = () => {

    
    return this._http.get<IProjectDto[]>(this.urlAddress + "project");
  }

  public getAllProjectStatusName = (id) => {

    let params = new HttpParams();
    params  = params.append('id', id.toString());
    return this._http.get<IProjectStatus[]>(this.urlAddress + "project/projectstatus", {params });
  }


}
