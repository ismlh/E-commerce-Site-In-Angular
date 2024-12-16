import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserMessage } from '../Models/iuser-message';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserMsgsService {
  constructor(private _httpClient: HttpClient) {}

  getAllMessages(): Observable<IUserMessage[]> {
    return this._httpClient.get<IUserMessage[]>(
      `${environment.baseUrl}usersMsgs`
    );
  }

  getMessage(id: string): Observable<IUserMessage> {
    return this._httpClient.get<IUserMessage>(
      `${environment.baseUrl}usersMsgs/${id}`
    );
  }

  addMessage(iuserMsg: IUserMessage): Observable<IUserMessage> {
    return this._httpClient.post<IUserMessage>(
      `${environment.baseUrl}usersMsgs`,
      JSON.stringify(iuserMsg)
    );
  }

  updateUserMsg(iuserMsg: IUserMessage, id: string): Observable<IUserMessage> {
    return this._httpClient.put<IUserMessage>(
      `${environment.baseUrl}usersMsgs/${id}`,
      iuserMsg
    );
  }

  deleteUserMsg(id: string): Observable<IUserMessage> {
    return this._httpClient.delete<IUserMessage>(
      `${environment.baseUrl}usersMsgs/${id}`
    );
  }
}
