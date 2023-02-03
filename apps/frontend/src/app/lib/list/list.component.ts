import {Component, Input, OnInit} from '@angular/core';
import {ChatroomsQuery} from "../../graphql/generated";
import {ChatroomService} from "../../chatroom/chatroom.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";

@Component({
  selector: 'mindmap-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() list!: ChatroomsQuery["chatrooms"];

  constructor(private chatroomService: ChatroomService,
              private _snackBar: MatSnackBar,
              private t: TranslateService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.chatroomService.chatroom$.subscribe((data) => {
      if (!data) return;
      console.log(data);
      this.list = [...data];
    });
  }

  deleteRoom(id: string) {
    this.chatroomService.deleteChatroom(id).subscribe({
      next: () => {
        this._snackBar.open(this.t.instant("DELETE_CHATROOM_MESSAGE_SUCCESSES"), 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.router.navigate(['chatrooms']);
      },
    });
  }
}
