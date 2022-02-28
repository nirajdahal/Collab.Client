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
    createdAt: string;
    updatedAt: string;
}

export interface ITicketType extends ITicketBase{

}
export interface ITicketStatus extends ITicketBase{

}
export interface ITicketPriority extends ITicketBase{

}