import { Injectable } from '@angular/core';
import { Iproduct } from '../Models/iproduct';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  constructor(private _httpClient: HttpClient) {}

  getAllProducts(): Observable<Iproduct[]> {
    return this._httpClient.get<Iproduct[]>(`${environment.baseUrl}products`);
  }
  getPrdById(id: string): Observable<Iproduct> {
    return this._httpClient.get<Iproduct>(
      `${environment.baseUrl}products/${Number(id)}`
    );
  }
  getPrdsByCatId(catId: number): Observable<Iproduct[]> {
    const params = new HttpParams().set('catid', catId);
    return this._httpClient.get<Iproduct[]>(`${environment.baseUrl}products`, {
      params: params,
    });
  }
  addProduct(product: Iproduct): Observable<Iproduct> {
    return this._httpClient.post<Iproduct>(
      `${environment.baseUrl}products`,
      product,
      { headers: new HttpHeaders({ authorization: 'dddddd' }) }
    );
  }

  updateProduct(id: string, product: Iproduct): Observable<Iproduct> {
    return this._httpClient.put<Iproduct>(
      `${environment.baseUrl}products/${id}`,
      product
    );
  }

  deleteProduct(id: string): Observable<Iproduct> {
    return this._httpClient.delete<Iproduct>(
      `${environment.baseUrl}products/${id}`,
      {
        headers: new HttpHeaders({
          authoriztion: 'jjjjjjjjjjjjjjj',
        }),
      }
    );
  }
}
