import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor() { }
  http = inject(HttpClient);

  wishlists: Product[] = [];

  init(){
    return this.getWishlists().subscribe((result)=>{
      this.wishlists = result;
    })
  }

  getWishlists(){
    const token = localStorage.getItem('token');
    return this.http.get<Product[]>(environment.apiUrl + '/customer/wishlists', {
    headers: {
      Authorization: token ? token : ''
    }
  })
  }

  addInWishlists(productId: string){
    const token = localStorage.getItem('token');
    return this.http.post(environment.apiUrl + '/customer/wishlists/'+ productId, 
      {},
      {
      headers: {
        Authorization: token ? token : ''
      }
    }
    );
  }

  removeFromWishlists(productId: string){
    const token = localStorage.getItem('token');
    return this.http.delete(environment.apiUrl + '/customer/wishlists/'+ productId, {
    headers: {
      Authorization: token ? token : ''
    }
  });
  }
}
