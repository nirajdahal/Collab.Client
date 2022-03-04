
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IProjectDto } from 'src/app/@shared/models/projects/project';
import { IPagination, ITicket, ITicketPriority, ITicketType, TicketSpecParam } from 'src/app/@shared/models/tickets/ticket';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TicketService {


  urlAddress = environment.apiUrl;
  constructor(private _http: HttpClient, private _jwtHelper: JwtHelperService) { }


  public getAllTicketsFromProjectId = (ticketParam: TicketSpecParam) => {

    let params = new HttpParams();
    if (ticketParam.projectId) {
      params = params.append('projectId', ticketParam.projectId.toString())
    }
    if (ticketParam.priorityId) {
      params = params.append('priorityId', ticketParam.priorityId.toString())
    }
    if (ticketParam.typeId) {
      params = params.append('typeId', ticketParam.typeId.toString())
    }
    if (ticketParam.sort) {
      params = params.append('sort', ticketParam.sort.toString())
    }
    if (ticketParam.search) {
      params = params.append('search', ticketParam.search.toString())
    }

    return this._http.get<IPagination<ITicket>>(this.urlAddress + "ticket", { params });
  }

  public getAllPrioritiesList(){
    return this._http.get<ITicketPriority[]>(this.urlAddress + "ticket/priority");
  }

  public getAllTypeList(){
    return this._http.get<ITicketType[]>(this.urlAddress + "ticket/type");
  }
}