import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from "../message.service";
import {MessagesQuery} from "../../graphql/generated";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'mindmap-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit, OnDestroy {

  messageList!: MessagesQuery['messages'];
  roomId = '';
  subscription: Subscription[] = [];

  constructor(private messageService: MessageService,
              private activeRoute: ActivatedRoute,) {
  }

  ngOnInit(): void {

    this.subscription.push(
      this.activeRoute.paramMap.subscribe((params) => {
        this.roomId = params.get('id') || '';
      }));
    if(this.roomId === '') return;
    this.subscription.push(this.messageService.getMessages(this.roomId).subscribe(
      {
        next: (messages) => {
          this.messageList = messages;
          console.log(messages);
        },
        error: (error) => {
          console.error('error: ', error);
        }
      }));
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
