import { Component, OnInit } from '@angular/core';

import { ProductService } from 'src/app/services/product.service';

import { Product } from 'src/app/models/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [],
})
export class ProductComponent implements OnInit {
  public products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService
      .getProducts()
      .subscribe((products) => (this.products = products));
    console.log(this.products);
  }
}
