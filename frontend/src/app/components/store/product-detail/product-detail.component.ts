import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { ProductDetail } from 'src/app/models/productDetail.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: [],
})
export class ProductDetailComponent {
  product?: ProductDetail | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const slug = params['slug'];
      this.getProductDetail(slug);
    });
  }

  getProductDetail(slug: string) {
    this.productService.getProductBySlug(slug).subscribe((product) => {
      this.product = product;
    });
  }
}
