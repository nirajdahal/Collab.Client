import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/@core/services/projects/project.service';
import { TicketService } from 'src/app/@core/services/tickets/ticket.service';
import { IProjectStatus } from 'src/app/@shared/models/projects/project';
import { IPagination, ITicket, ITicketPriority, ITicketStatus, ITicketType, TicketSpecParam } from 'src/app/@shared/models/tickets/ticket';
import { IUser } from 'src/app/@shared/models/users/user';

@Component({
  selector: 'app-testproject',
  templateUrl: './testproject.component.html',
  styleUrls: ['./testproject.component.scss']
})
export class TestprojectComponent implements OnInit {
  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef, private ticketService: TicketService, private projectService: ProjectService) {}
  
    
  currentProjectIdSnap : number = 1;
  ngOnInit(): void {
 
    this.currentProjectIdSnap = parseInt(this.route.snapshot.paramMap.get("id"))
    this.ticketSpecParam.projectId = this.currentProjectIdSnap;
    this.getAllTicketList();
    
  }


  getAllTicketList(){
    this.ticketService.getAllTicketsWithProjectStatus(this.ticketSpecParam).subscribe(t => {
      this.ticketsFromAPI = t;
      this.ticketSpecParam.projectId = this.currentProjectIdSnap;
      this.getProjStatusList();
     
    });
  }

  getProjStatusList(){
    this.projectService.getAllProjectStatusName(this.currentProjectIdSnap).subscribe(ps => {
      
      this.projectStatusListFromAPI = ps;
      this.convertAPIDataIntoList(ps);
    }) 
  }
  
  ticketSpecParam: TicketSpecParam =  {
    
    sort : "DateAsc",
    pageIndex : 1,
    pageSize : 50
}

  // Dahboard Condfiguration
  
  projectStatusListFromAPI: IProjectStatus[]=[] 
  ticketsFromAPI: IPagination<ITicket> = null ;
   dashboardModelData: IDropableDahboardModel[]=[];

   convertAPIDataIntoList(projectStatus : IProjectStatus[]){

    projectStatus.forEach(s => {

      let convertedList = this.converTicketListIntoDroppableModel(s.id)
      this.dashboardModelData.push({
        name: s.name,
        dropableTicketList: convertedList,
        count: convertedList.length
      })
    });
  }

  getTicketForProjectStatusId(id : number)  {

    
    let filteredTicketList=  this.ticketsFromAPI.data.filter(function(ticket) {
      return ticket.projectStatus.id == id;
    });
    
    return filteredTicketList

  }

  mapTicketToIDropabaleList(tickets: ITicket[]) : IDropableListModel[]{
    let dropableModelData: IDropableListModel[] = [];
    
    tickets.forEach(ticket => {
      let dropableModel: IDropableListModel = new IDropableListModel();
      
      dropableModel.description = ticket.description;
      dropableModel.ticketType = ticket.ticketType ;
      dropableModel.ticketPriority = ticket.ticketPriority;
      dropableModel.ticketStatus= ticket.ticketStatus;
      dropableModel.assignedDevelopers = ticket.assignedDevelopers;
      dropableModel.projectStatus = ticket.projectStatus;
      dropableModel.createdAt = ticket.createdAt;
      dropableModel.updatedAt = ticket.updatedAt;
      dropableModel.id = ticket.id;
      dropableModel.name = ticket.name;
      dropableModel.isSelected = false;

      dropableModelData.push(dropableModel);
    });
    return dropableModelData;
  }

  converTicketListIntoDroppableModel(id: number){
      let filteredTicket = this.getTicketForProjectStatusId(id);
      let dropableModelData: IDropableListModel[] = this.mapTicketToIDropabaleList(filteredTicket);
      return dropableModelData;
  }

  // Dashboard Configuration End



  

  onToggle(event) {
    console.log(event);
  }
  //user button end
  
 
  onSearch(term) {
    console.log(term);
  }
  showOriginPlaceholder = false;
  switchWhileCrossEdge = false;

  

  onDrop(e: any, targetArray: Array<any>) {
    if (e.dropOnOrigin) {
      return;
    }
    if (e.batchDragData) {
      this.batchDrop(e, targetArray);
      return;
    }
    let index = e.dropIndex;
    const fromIndex = e.dragFromIndex;
    const parentArray = e.dragData.parent;
    const item = e.dragData.item;
    if (-1 !== index) {
      if (-1 !== fromIndex && index > fromIndex) {
        index--;
      }
      targetArray.splice(index, 0, fromIndex === -1 ? item : targetArray.splice(fromIndex, 1)[0]);
    } else {
      targetArray.push(item);
    }
    if (fromIndex === -1) {
      this.removeItem(item, parentArray);
    }
  }

  batchDrop(e, targetArray: Array<any>) {
    let fromIndexLessThanDropIndexCount = 0;
    e.batchDragData
      .map((dragData) => {
        const index = targetArray.indexOf(dragData.item);
        if (index > -1 && index < e.dropIndex) {
          fromIndexLessThanDropIndexCount++;
        }
        return dragData;
      })
      .forEach((dragData) => {
        this.removeItem(dragData.item, dragData.parent);
      });
    targetArray.splice(e.dropIndex - fromIndexLessThanDropIndexCount, 0, ...e.batchDragData.map((batchitem) => batchitem.item));
    return;
  }

  removeItem(item: any, list: Array<any>) {
    const index = list.indexOf(item);
    list.splice(index, 1);
  }
  batchSelect(item) {
    item.isSelected = !(item.isSelected || false);
    this.cdr.detectChanges();
  }

  batchSelectCheck(event: MouseEvent, item) {
    if (event.ctrlKey) {
      this.batchSelect(item);
    }
  }

}


export class IDropableDahboardModel{

  name: string;
  count: number ;
  dropableTicketList: IDropableListModel[]


}

export class IDropableListModel implements ITicket{
  description: string;
  ticketType: ITicketType;
  ticketPriority: ITicketPriority;
  ticketStatus: ITicketStatus;
  assignedDevelopers: IUser[];
  projectStatus: IProjectStatus;
  createdAt: Date;
  updatedAt: Date;
  id: number;
  name: string;
  isSelected:boolean = false;
  

}