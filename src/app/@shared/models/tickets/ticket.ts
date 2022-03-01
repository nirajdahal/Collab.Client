import { IProjectStatus } from "../projects/project";
import { IUser } from "../users/user";

interface ITicketBase{
id:number
name: string
}


export interface IPagination<ITicket> {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: ITicket[];
}

export interface ITicket extends ITicketBase {
   
    
    description: string;
    ticketType: ITicketType;
    ticketPriority: ITicketPriority;
    ticketStatus: ITicketStatus;
    assignedDevelopers: IUser[];
    projectStatus: IProjectStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface ITicketType extends ITicketBase{

    themeColor: string;

}
export interface ITicketStatus extends ITicketBase{
    themeColor: string;
}
export interface ITicketPriority extends ITicketBase{
    themeColor: string;
}

export interface TicketSpecParam {
    
    priorityId?: number;
    projectId?: number;
    sort?: string;
    search?: string;
    typeId?: number;
    pageIndex: number;
    pageSize: number;
}