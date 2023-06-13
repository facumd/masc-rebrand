import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductDetail } from 'src/app/models/productDetail.interface';
import { Subcategories } from 'src/app/models/subcategories.interface';

import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  product?: ProductDetail;
  productForm!: FormGroup;
  subcategories: Subcategories[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      slug: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      image_link: ['', Validators.required],
      image_file: [null, Validators.required],
      subcategory: ['', Validators.required],
    });

    this.productService.getSubcategories().subscribe(
      (subcategories: Subcategories[]) => {
        this.subcategories = subcategories;
      },
      (error) => {
        console.error('Error fetching subcategories:', error);
      }
    );
  }

  createProduct() {
    if (this.productForm?.invalid) {
      return;
    }

    const selectedSubcategoryId = this.productForm.value.subcategory;
    const selectedSubcategory = this.subcategories.find(
      (subcategory) => subcategory.id === selectedSubcategoryId
    );

    if (!selectedSubcategory) {
      console.error('Selected subcategory does not exist');
      return;
    }

    const productData = {
      ...this.productForm.value,
      subcategory: selectedSubcategory ? selectedSubcategory.id : null,
      created_by: this.authService.getUserId(),
    };

    setTimeout(() => {
      console.log('Product Data:', productData); // Log the product data after a delay
    }, 1000); // Delay of 1 second (adjust as needed)

    this.productService.createProduct(productData).subscribe({
      next: (response: ProductDetail) => {
        console.log('Product created:', response);
      },
      error: (error) => {
        console.error('Error creating product:', error);
      },
    });
  }
}
