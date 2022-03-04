import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
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
  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef, private ticketService: TicketService, private projectService: ProjectService) { }



  currentProjectIdSnap: number = 1;
  ngOnInit(): void {

    this.currentProjectIdSnap = parseInt(this.route.snapshot.paramMap.get("id"))
    this.ticketSpecParam.projectId = this.currentProjectIdSnap;
    this.getAllTicketList();

    this.getAndSetTicketPriorityList();
    this.getAndSetTicketTypeList();


  }

  //API Work Start

  getAllTicketList() {
    this.ticketService.getAllTicketsFromProjectId(this.ticketSpecParam).subscribe(t => {
      this.ticketsFromAPI = t;
      this.ticketSpecParam.projectId = this.currentProjectIdSnap;
      this.getProjStatusList();
    });
  }

  getProjStatusList() {
    this.projectService.getAllProjectStatusName(this.currentProjectIdSnap).subscribe(ps => {

      this.projectStatusListFromAPI = ps;
      this.convertAPIDataIntoList(ps);
    })
  }

  getAndSetTicketTypeList() {
    let ticketTypeListFromLocalStorage = JSON.parse(localStorage.getItem('ticketTypeList'))

    if (ticketTypeListFromLocalStorage === null) {
      this.ticketService.getAllTypeList().subscribe(t => {
        localStorage.setItem('ticketTypeList', JSON.stringify(t));

        this.makeNameListFromTypeList(t);
      })
    }
    else {
      this.makeNameListFromTypeList(ticketTypeListFromLocalStorage)
    }
  }

  getAndSetTicketPriorityList() {
    let ticketPriorityListFromLocalStorage = JSON.parse(localStorage.getItem('ticketPriorityList'))
    if (ticketPriorityListFromLocalStorage === null) {


      this.ticketService.getAllPrioritiesList().subscribe(p => {
        localStorage.setItem('ticketPriorityList', JSON.stringify(p));
        this.makeNameListFromPriorityList(p);
      })
    }
    else {
      this.makeNameListFromPriorityList(ticketPriorityListFromLocalStorage);
    }
  }

  //api work end



  //search feature
  searchWord: string = "";
  onSearch() {
    
      this.ticketSpecParam.search = this.searchWord;
      console.log(this.ticketSpecParam)
      this.settingTicket_OnSearch_Filter_Sort();

    
  }

  // Filter Setup Starts

  tikcetTypeList: ITicketType[] = []
  ticketTypeNameList: any = []
  ticketPriorityNameList: any = []

  makeNameListFromPriorityList(priorityList: any) {

    let arrayList = [];
    priorityList.forEach(element => {
      arrayList.push(element.name)
    });
    this.ticketPriorityNameList = arrayList;

  }


  makeNameListFromTypeList(ticketType) {
    let arrayList = [];
    ticketType.forEach(element => {
      arrayList.push(element.name)
    });

    this.ticketTypeNameList = arrayList;
  }
  selectTicketTypeName;
  selectTicketPriorityName;

  setupTicketTypeOnDropDown = (term) => {


    var test = of(this.ticketTypeNameList.filter(lang => lang.toLowerCase().indexOf(term.toLowerCase()) !== -1))

    return test;

  };

  setupTicketPriorityOnDropDown = (term) => {


    var test = of(this.ticketPriorityNameList.filter(lang => lang.toLowerCase().indexOf(term.toLowerCase()) !== -1))

    return test;

  };




  selectPriorityFilterId: number = null;
  selectTypeFilterId: number = null;
  ticketSpecParam: TicketSpecParam = {

   
    sort: "DateAsc",
    pageIndex: 1,
    pageSize: 50,
    
  }

  applyFilter() {
    console.log("i am clicked")
    let typeObj = this.getIdFromTypeName()
    if (typeObj !== undefined) {
      this.ticketSpecParam.typeId = typeObj.id;
    }



    let priorityObj = this.getIdFromPriorityeName()
    console.log(priorityObj)
    if (priorityObj !== undefined) {
      this.ticketSpecParam.priorityId = priorityObj.id;
    }

    console.log(this.ticketSpecParam)

    this.settingTicket_OnSearch_Filter_Sort();

  }

  clearFilter() {
    this.ticketSpecParam = {

   
      sort: "DateAsc",
      pageIndex: 1,
      pageSize: 50,
      
    }
    this.settingTicket_OnSearch_Filter_Sort();
    this.selectTicketTypeName="";
    this.selectTicketPriorityName="";

  }

  settingTicket_OnSearch_Filter_Sort() {
    this.dashboardModelData = []
    this.ticketService.getAllTicketsFromProjectId(this.ticketSpecParam).subscribe(t => {

      this.ticketsFromAPI = t;
      this.ticketSpecParam.projectId = this.currentProjectIdSnap;
      this.convertAPIDataIntoList(this.projectStatusListFromAPI);
    })

  }


  getIdFromTypeName() {


    let ticketTypeListFromLocalStorage = JSON.parse(localStorage.getItem('ticketTypeList'))

    let idToReturn = ticketTypeListFromLocalStorage.find(t => t.name === this.selectTicketTypeName)
    return idToReturn;
  }

  getIdFromPriorityeName() {


    let ticketPriorityListFromLocalStorage = JSON.parse(localStorage.getItem('ticketPriorityList'))

    let idToReturn = ticketPriorityListFromLocalStorage.find(t => t.name === this.selectTicketPriorityName)
    return idToReturn;

  }

  // Dahboard Condfiguration

  projectStatusListFromAPI: IProjectStatus[] = []
  ticketsFromAPI: IPagination<ITicket> = null;
  dashboardModelData: IDropableDahboardModel[] = [];

  convertAPIDataIntoList(projectStatus: IProjectStatus[]) {
    // let adashboardModelData: IDropableDahboardModel[] = [];
    // let bdashboardModelData: Observable<IDropableDahboardModel[]> = of([]);
    // bdashboardModelData.pipe(map((data:any) => {
    //   adashboardModelData = data
    // })); 
    projectStatus.forEach(s => {

      let convertedList = this.converTicketListIntoDroppableModel(s.id)
      this.dashboardModelData.push({
        name: s.name,
        dropableTicketList: convertedList,
        count: convertedList.length
      })
    });
  }

  getTicketForProjectStatusId(id: number) {

    if (this.ticketsFromAPI !== null) {
      let filteredTicketList = this.ticketsFromAPI.data.filter(function (ticket) {
        return ticket.projectStatus.id == id;

      });
      return filteredTicketList
    }



  }

  mapTicketToIDropabaleList(tickets: ITicket[]): IDropableListModel[] {
    let dropableModelData: IDropableListModel[] = [];

    tickets.forEach(ticket => {
      let dropableModel: IDropableListModel = new IDropableListModel();

      dropableModel.description = ticket.description;
      dropableModel.ticketType = ticket.ticketType;
      dropableModel.ticketPriority = ticket.ticketPriority;
      dropableModel.ticketStatus = ticket.ticketStatus;
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

  converTicketListIntoDroppableModel(id: number) {
    let filteredTicket = this.getTicketForProjectStatusId(id);
    let dropableModelData: IDropableListModel[] = this.mapTicketToIDropabaleList(filteredTicket);
    return dropableModelData;
  }

  // Dashboard Configuration End





  onToggle(event: any) {
    console.log(event);
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


export class IDropableDahboardModel {

  name: string;
  count: number;
  dropableTicketList: IDropableListModel[]


}

export class IDropableListModel implements ITicket {
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
  isSelected: boolean = false;


}