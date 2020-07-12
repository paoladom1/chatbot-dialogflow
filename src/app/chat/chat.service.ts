import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { ApiAiClient } from 'api-ai-javascript';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class Message {
  constructor(public content: string, public sentBy: string) {}
}

@Injectable()
export class ChatService {

  readonly token = environment.dialogflow.angularBot;
  readonly client = new ApiAiClient({ accessToken: this.token });

  conversation = new BehaviorSubject<Message[]>([]);

  constructor() {}

  // Sends and receives messages via DialogFlow
  converse(msg: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);

    return this.client.textRequest(msg)
              .then(res => {
                   const objetoJSON = JSON.parse(JSON.stringify(res.result.fulfillment));
                   const array = objetoJSON['messages'];
                   const posicion1 = array[0];
                   const msg1 = posicion1['speech'];
                   const posicion2 = array[1];
                   const msg2 = posicion2['speech'];
                   const speech = objetoJSON['messages'];
                   const botMessage = new Message(msg1.toString(), 'bot');
                   this.update(botMessage);
                   const botMsg = new Message(msg2.toString(), 'bot');
                   this.update(botMsg);
                 }
               );
  }

  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }


}
