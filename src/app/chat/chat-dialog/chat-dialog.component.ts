import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})

export class ChatDialogComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;
  cont = 1 ;

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

  // Mensaje de bienvenida
  bienvenida() {
    this.chat.convers('hola');
  }

  get getTemplate() {
    if (this.estado) {
      return this.closeTemplate;
    } else {
      return this.openTemplate;
    }
  }

  // Minimizar
  changeTemplate() {
    if (this.cont === 1) {
      this.bienvenida();
      this.cont++;
    }
  }

  // Cerrar
  nuevoTemplate() {
    this.cont = 1;
    this.estado = !this.estado;
    this.chat.clear('');
  }
}
