import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { CategoryService } from '../../../services/category.service';
import { BrandService } from '../../../services/brand.service';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormField, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  formBuilder = inject(FormBuilder);
  productForm = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(5)]],
    shortDescription: [null, [Validators.required, Validators.minLength(10)]],
    description: [null, [Validators.required, Validators.minLength(50)]],
    price: [null, [Validators.required]],
    discount: [],
    images: this.formBuilder.array([]),
    categoryId: [null, [Validators.required]],
    brandId: [null, [Validators.required]],
    isFeatured: false,
    isNewProduct: false
  });

  categoryService = inject(CategoryService);
  brandService = inject(BrandService);
  productService = inject(ProductService);
  brands: any[] = [];
  categories: any[] = [];
  ngOnInit(){
    this.addImage();
    this.categoryService.getCategories().subscribe((result: any)=>{
      this.categories = result;
    });
    this.brandService.getBrands().subscribe((result: any)=>{
      this.brands = result;
    });
  }

  router = inject(Router);
  addProduct(){
    let value = this.productForm.value;
    console.log(value);
    this.productService.addProduct(value as any).subscribe((result: any)=>{
      alert("Product Added");
      this.router.navigateByUrl('/admin/products');
    })
  }
  addImage(){
    this.images.push(this.formBuilder.control(null));
  }

  removeImage(){
    this.images.removeAt(this.images.length-1);
  }

  get images(){
    return this.productForm.get('images') as FormArray;
  }
}
