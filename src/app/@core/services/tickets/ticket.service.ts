
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IProjectDto } from 'src/app/@shared/models/projects/project';
import { IPagination, ITicket } from 'src/app/@shared/models/tickets/ticket';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
  })
  export class TicketService {
  
  
    urlAddress = environment.apiUrl;
    constructor(private _http: HttpClient, private _jwtHelper: JwtHelperService) { }
  
  
    public getAllTicketsWithProjectStatus = () => {

      return this._http.get<IPagination<ITicket>>(this.urlAddress + "ticket");
    }
  }