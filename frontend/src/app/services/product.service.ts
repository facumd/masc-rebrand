import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url: String = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/api/v1/product/list`);
  }
}
