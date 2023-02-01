import {Component, Input} from '@angular/core';
import {ChatroomItem} from "../../shared/types";

@Component({
  selector: 'mindmap-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() list!: ChatroomItem[];

  //
  // ngOnInit(): void {
  //   // console.log(this.list);
  // }
}
