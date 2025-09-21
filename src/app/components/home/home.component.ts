import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  customerService = inject(CustomerService);
  newProducts: any[] = [];
  featuredProducts: any[] = [];
  wishlistService= inject(WishlistService);
  ngOnInit() {
    this.customerService.getFeaturedProducts().subscribe((result: any)=>{
      this.featuredProducts = result;
      console.log("new products: ",this.featuredProducts);
    });
    
    this.customerService.getNewProducts().subscribe((result: any)=>{
      this.newProducts = result;
      console.log("featured products: ",this.newProducts);
    });
    this.wishlistService.init();
  }
}
