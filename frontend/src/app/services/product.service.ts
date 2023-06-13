import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../models/product.interface';
import { ProductDetail } from '../models/productDetail.interface';
import { Subcategories } from '../models/subcategories.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url: String = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/api/v1/product/list`);
  }

  getProductBySlug(slug: string): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(`${this.url}/api/v1/product/${slug}`);
  }

  createProduct(product: ProductDetail): Observable<ProductDetail> {
    return this.http.post<ProductDetail>(
      `${this.url}/api/v1/product/list`,
      product
    );
  }

  getSubcategories(): Observable<Subcategories[]> {
    return this.http.get<Subcategories[]>(
      `${this.url}/api/v1/subcategory/list`
    );
  }
}
