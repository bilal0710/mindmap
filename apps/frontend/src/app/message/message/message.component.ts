import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from "../message.service";
import {MessagesQuery, UsersQuery} from "../../graphql/generated";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {combineLatest} from "rxjs";
import {ChatroomService} from "../../chatroom/chatroom.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'mindmap-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit, OnDestroy {

  messageList!: MessagesQuery['messages'];
  roomId = '';
  message = '';
  subscription: Subscription[] = [];
  user!: UsersQuery['users'][number];
  public iMessageContainerHeight: number;
  public textAreaContainerHeight: number


  constructor(private messageService: MessageService,
              private activeRoute: ActivatedRoute,
              private chatroomService: ChatroomService,
              private _snackBar: MatSnackBar) {
    const height = window.innerHeight - 64;
    this.iMessageContainerHeight = (height * 90) / 100;
    this.textAreaContainerHeight = height - this.iMessageContainerHeight
  }

  ngOnInit(): void {

    this.subscription.push(
      this.activeRoute.paramMap.subscribe((params) => {
        this.roomId = params.get('id') || '';
      }));

    if (this.roomId === '') return;
    this.subscription.push(
      combineLatest([
        this.messageService.getMessages(this.roomId),
        this.chatroomService.whoAmI()])
        .subscribe(([messages, user]) => {
          this.messageList = messages;
          this.user = user;
        }));
    this.subscription.push(this.messageService.subscribeNewMessage(this.roomId).subscribe((result) => {
      this.messageList.push(result.data?.newMessage as MessagesQuery['messages'][number]);
    }));
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  sendMessage() {
    if (this.message.trim().length === 0) return;

    this.messageService.createMessage(this.roomId, this.message, this.user.id).subscribe(
      {
        next: result => {
          console.log('result', result);
        },
        error: error => {
          this._snackBar.open(error.message, undefined, {
            panelClass: 'snackbar-error',
          });
        }
      });
    this.message = '';
  }
}
