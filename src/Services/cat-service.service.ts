import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iproduct } from '../Models/iproduct';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { ICategory } from '../Models/icategory';

@Injectable({
  providedIn: 'root',
})
export class CatServiceService {
  constructor(private _httpClient: HttpClient) {}

  getAllCategories(): Observable<Iproduct[]> {
    return this._httpClient.get<Iproduct[]>(`${environment.baseUrl}categories`);
  }
  getCategoryById(id: string): Observable<Iproduct> {
    return this._httpClient.get<Iproduct>(
      `${environment.baseUrl}categories/${id}`
    );
  }
  addCategory(category: ICategory): Observable<ICategory> {
    return this._httpClient.post<ICategory>(
      `${environment.baseUrl}categories`,
      category
    );
  }
  updateCategory(id: string, category: ICategory): Observable<ICategory> {
    return this._httpClient.put<ICategory>(
      `${environment.baseUrl}categories/${id}`,
      category
    );
  }
  deleteCategory(id: string): Observable<Iproduct> {
    return this._httpClient.delete<Iproduct>(
      `${environment.baseUrl}categories/${id}`
    );
  }
}
