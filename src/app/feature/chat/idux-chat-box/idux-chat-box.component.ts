import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
// import { FormsModule } from '@angular/forms';
@Component({
  selector: 'feat-idux-chat-box',
  templateUrl: './idux-chat-box.component.html',
  styleUrls: ['./idux-chat-box.component.css']
})
export class IduxChatBoxComponent implements OnInit {
  SOCKET_ENDPOINT = 'localhost:3001';
  socket;
  message;
  constructor() { }

  ngOnInit(): void {
    this.setupSocketConnection();
  }
  setupSocketConnection() {
    this.socket = io(this.SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: string) => {
      if (data) {
       const element = document.createElement('li');
       element.innerHTML = data;
       element.style.background = 'white';
       element.style.padding =  '15px 30px';
       element.style.margin = '10px';
       document.getElementById('message-list').appendChild(element);
       }
     });
 }
  SendMessage() {
    this.socket.emit('message', this.message);
    const element = document.createElement('li');
    element.innerHTML = this.message;
    element.style.background = 'white';
    element.style.padding =  '15px 30px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    document.getElementById('message-list').appendChild(element);
    this.message = '';
  }
}
