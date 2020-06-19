import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';


@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})

export class ChatDialogComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;

  @ViewChild('closeTemplate') closeTemplate: TemplateRef<any>;
  @ViewChild('openTemplate') openTemplate: TemplateRef<any>;
  estado: boolean;
  name = 'Dynamic Temmplates';
  constructor(public chat: ChatService) {
    this.estado = true;
  }
  ngOnInit() {
    // appends to array after each new message is added to feedSource
    this.messages = this.chat.conversation.asObservable()
      .scan((acc, val) => acc.concat(val) );
  }

  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
  }

  get getTemplate() {
    if (this.estado) {
      return this.closeTemplate;
    } else {
      return this.openTemplate;
    }

  }

  changeTemplate() {
    this.estado = !this.estado;
  }

}
