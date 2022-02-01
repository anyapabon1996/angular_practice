import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './service/cart.service';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './store/cart.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CartEffect } from './store/cart.effect';

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    StoreModule.forFeature('cart', cartReducer),
    EffectsModule.forFeature([CartEffect]),
  ],
  providers: [
    CartService
  ]
})
export class CartModule { }
