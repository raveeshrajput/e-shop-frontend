import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/product';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { WishlistService } from '../../services/wishlist.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, MatIconModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  customerService = inject(CustomerService);
  route = inject(ActivatedRoute);
  product!: Product;
  mainImage!: string;
  similarProduct: Product[]=[];
  ngOnInit(){
    this.route.params.subscribe((x: any)=>{
      this.getProductDetail(x.id);
    })
    
  }

  getProductDetail(id: string){
    this.customerService.getProductById(id).subscribe((result)=>{
      this.product = result;
      this.mainImage = this.product.images[0];
      console.log("product details", this.product);

      this.customerService.getProducts('', this.product.categoryId, '', -1, '', 1, 4).subscribe(result=>{
        this.similarProduct = result;
      })
    });
  }

  changeImage(url: string){
    this.mainImage = url;
  }

  get sellingPrice(){
    return Math.round(this.product.price - (this.product.price*this.product.discount)/100);
  }

  wishlistService=inject(WishlistService);
  addToWishList(product: Product){
    console.log(product);
    if(this.isInWishlist(product)){
      this.wishlistService.removeFromWishlists(product._id!).subscribe((result)=>{
        this.wishlistService.init();
      });
    } else {
      this.wishlistService.addInWishlists(product._id!).subscribe((result)=>{
        this.wishlistService.init();
      });
    }
  }

  isInWishlist(product: Product){
    let isExits = this.wishlistService.wishlists.find(x=>x._id==product._id);
    if(isExits){
      return true;
    } else {
      return false;
    }
  }
}
