import { Component, OnInit } from '@angular/core';
import { UserMsgsService } from '../../Services/user-msgs.service';
import { IUserMessage } from '../../Models/iuser-message';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent implements OnInit {
  usersMessages: IUserMessage[] = [] as IUserMessage[];

  userMessage: IUserMessage = {
    Addrees: {
      City: '',
      Street: '',
    },
    Phones: [],
  } as IUserMessage;

  constructor(private _userMsg: UserMsgsService) {}
  ngOnInit(): void {
    this.getAllMessages();
  }

  getAllMessages() {
    this._userMsg.getAllMessages().subscribe({
      next: (res) => {
        this.usersMessages = res;
      },
      error: (err) => {
        alert('Error');
      },
    });
  }
  Edit(msgId: string) {
    this._userMsg.getMessage(msgId).subscribe({
      next: (res) => {
        this.userMessage = res;
      },
    });
  }

  deletePrd(id: string) {
    this._userMsg.deleteUserMsg(id).subscribe({
      next: (res) => {
        alert(`Msg With Id : (${res.id}) deleted`);
        this.getAllMessages();
      },
      error: () => {
        alert('error');
      },
    });
  }

  Save() {
    this._userMsg
      .updateUserMsg(this.userMessage, this.userMessage.id)
      .subscribe(() => {
        alert('Updated Successfully');
        this.getAllMessages();
        this.userMessage = {
          Addrees: {
            City: '',
            Street: '',
          },
          Phones: [],
        } as IUserMessage;
      });
  }
}
