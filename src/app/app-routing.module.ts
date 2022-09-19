import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { VendordashboardComponent } from './vendordashboard/vendordashboard.component';
import { AutoclearstoreComponent } from './autoclearstore/autoclearstore.component';
import { VendorsComponent } from './vendors/vendors.component';
import { CustomersComponent } from './customers/customers.component';
import { OrdersComponent } from './orders/orders.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { RolesComponent } from './roles/user-roles.component';
import { ResetPassWordComponent } from './reset-pass-word/reset-pass-word.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { LogoutComponent } from './user/logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { ReturnsComponent } from './returns/returns.component';
import { UserAccountComponent } from './UserAccount/user-account.component';
import { UpdateDetailsComponent } from './UserAccount/update-details/update-details.component';
import { DeleteAccountComponent } from './UserAccount/delete-account/delete-account.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { CustomerReviewsComponent } from './customer-reviews/customer-reviews.component';
import { CartComponent } from './product-catalog/cart/cart.component';
import { CartItemComponent } from './product-catalog/cart/cart-item/cart-item.component';
import { FiltersComponent } from './product-catalog/filters/filters.component';
import { ProductItemComponent } from './product-catalog/product-list/product-item/product-item.component';
import { ProductListComponent } from './product-catalog/product-list/product-list.component';
import { ApplicationComponent } from './application/application.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { BrandsComponent } from './brands/brands.component';
import { TypesComponent } from './types/types.component';
import { CategoriesComponent } from './categories/categories.component';
import { CourierComponent } from './courier/courier.component';
import { PaymentsuccessformComponent } from './paymentsuccessform/paymentsuccessform.component';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { OnSaleComponent } from './promotions/onsale/on-sale.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';


const routes: Routes = [
  
  {path: '', redirectTo: '/user/login', pathMatch: 'full'},
  {path: 'user', component: UserComponent,
   children: [
     {path: 'login', component: LoginComponent},
     {path: 'registration', component: RegistrationComponent},
   ]},

   {path: 'admindashboard', component: AdmindashboardComponent,
    children:[
        {path: '', component: DashboardComponent,pathMatch: 'full'},
        {path: 'dashboard', component: DashboardComponent},
        {path: 'vendors', component: VendorsComponent},
        {path: 'customers', component: CustomersComponent},
        {path: 'orders', component: OrdersComponent},
        {path: 'invoices', component: InvoicesComponent},
        {path: 'roles', component: RolesComponent},
        {path: 'reset', component: ResetPassWordComponent},
        {path: 'reviews', component: ReviewsComponent},
        {path: 'promotions', component: PromotionsComponent},
        {path: 'products', component: ProductsComponent},
        {path: 'brands', component: BrandsComponent},
        {path: 'types', component: TypesComponent},
        {path:'subscribers', component: SubscribersComponent},
        {path: 'categories', component: CategoriesComponent},
        {path: 'courier', component: CourierComponent},
        {path: 'logout', component: LogoutComponent}
    ]
   },

   {path: 'vendordashboard', component: VendordashboardComponent,
      children:[
        {path: 'returns', component: ReturnsComponent},
        {path: 'products', component: ProductsComponent},
        {path: 'orders', component: OrdersComponent}
      ]
   },

   {path: 'logout', component: LogoutComponent},

   {path: 'UserAccount', component: UserAccountComponent,
      children:[
        {path: 'update', component: UpdateDetailsComponent},
        {path: 'delete', component: DeleteAccountComponent},
        {path: 'orders', component: OrdersComponent},
        {path: 'customer-reviews', component: CustomerReviewsComponent},
        {path: 'logout', component: LogoutComponent}
      ]
   },
   {path: 'autoclearstore', component: AutoclearstoreComponent,
      children:[
        {path: 'UserAccount', component: UserAccountComponent},
      ]
   },

   {path: 'single-product', component: SingleProductComponent},
   {path: 'application', component: ApplicationComponent},
   {path: 'shopping-cart', component: ShoppingCartComponent},
   {path: 'wishlist', component: WishlistComponent},
   {path: 'paymentsuccessform', component: PaymentsuccessformComponent},
   {path: 'promotions/onsale', component: OnSaleComponent},
   {path: 'forgotpassword', component: ForgotPasswordComponent}
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }