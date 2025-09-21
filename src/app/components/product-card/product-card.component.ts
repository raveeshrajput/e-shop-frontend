import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;
  wishlistService= inject(WishlistService);

  get sellingPrice(){
    return Math.round(this.product.price - (this.product.price*this.product.discount)/100);
  }

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
