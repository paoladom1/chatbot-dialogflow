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
                if (array.length > 1) {
                  for (let i = 0; i < array.length; i++) {
                    const posicion1 = array[i];
                    const msg1 = posicion1['speech'];
                    const botMessage = new Message(msg1.toString(), 'bot');
                    this.update(botMessage);
                  }
                } else {
                  const mensaje = res.result.fulfillment.speech;
                  const botMsg = new Message(mensaje, 'bot');
                  this.update(botMsg);
                }
                 }
               );
  }

  // Sends and receives messages via DialogFlow BIENVENIDA
  convers(msg: string) {

    return this.client.textRequest(msg)
      .then(res => {
          const objetoJSON = JSON.parse(JSON.stringify(res.result.fulfillment));
          const array = objetoJSON['messages'];
          if (array.length > 1) {
            for (let i = 0; i < array.length; i++) {
              const posicion1 = array[i];
              const msg1 = posicion1['speech'];
              const botMessage = new Message(msg1.toString(), 'bot');
              this.update(botMessage);
            }
          } else {
            const mensaje = res.result.fulfillment.speech;
            const botMsg = new Message(mensaje, 'bot');
            this.update(botMsg);
          }
        }
      );
  }

  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }

  clear(msg: string) {
    const botMsg = new Message(null, null);

    return this.update(botMsg);
  }

}
