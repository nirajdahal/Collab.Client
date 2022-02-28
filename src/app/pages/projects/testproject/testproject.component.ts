import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/@core/services/projects/project.service';
import { TicketService } from 'src/app/@core/services/tickets/ticket.service';
import { IProjectStatus } from 'src/app/@shared/models/projects/project';

@Component({
  selector: 'app-testproject',
  templateUrl: './testproject.component.html',
  styleUrls: ['./testproject.component.scss']
})
export class TestprojectComponent implements OnInit {
  
  //user button
  items: any = ['New', 'Delete', 'Item 1', 'Item 2', 'Item 3', 'Item 4'];

  onToggle(event) {
    console.log(event);
  }
  //user button end
  
  lists = [
    {
      name: ' Todo',
      list: [
        { name: 'Visual Studio Code isual Studio Cod isual Studio Cod Visual Studi€o Code isual Studio Cod isual Studio Cod', isSelected: false },
        { name: 'WebStorm', isSelected: false },
        { name: 'Sublime Text', isSelected: false },
        { name: 'Atom', isSelected: false },
        { name: 'Notepad++', isSelected: false },
      ],
    },
    {
      name: 'Browser',
      list: [
        { name: 'Chrome', isSelected: false },
        { name: 'Firefox', isSelected: false },
        { name: 'Opera', isSelected: false },
        { name: 'Edge', isSelected: false },
        { name: 'Internet Explorer', isSelected: false },
        { name: 'Safari', isSelected: false },
      ],
    },
    {
      name: 'OS',
      list: [
        { name: 'Linux', isSelected: false },
        { name: 'Windows', isSelected: false },
        { name: 'Mac OS', isSelected: false },
        { name: 'DOS', isSelected: false },
        { name: 'Chrome OS', isSelected: false },
      ],
    },
    {
      name: 'Mobile OS',
      list: [
        { name: 'Android', isSelected: false },
        { name: 'IOS', isSelected: false },
        { name: 'BlackBerry', isSelected: false },
        { name: 'Symbian', isSelected: false },
      ],
    },
    {
      name: 'Whatever',
      list: [],
    },
  ];


  convertAPIDataIntoList(){

  }


  onSearch(term) {
    console.log(term);
  }
  showOriginPlaceholder = false;
  switchWhileCrossEdge = false;

  projectStatusList: IProjectStatus[]=[]

  constructor(private cdr: ChangeDetectorRef, private ticketService: TicketService, private projectService: ProjectService) {}
  ngOnInit(): void {

    this.ticketService.getAllTicketsWithProjectStatus().subscribe(x => {
      console.log(x)
    });
    this.projectService.getAllProjectStatusName().subscribe(x => {
      this.projectStatusList = x
    })
    
    
  }

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
