import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Custom Modules
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxFeedbackModule } from 'ngx-feedback';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatNativeDateModule} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs'; 
import { NgxStarRatingModule } from 'ngx-star-rating';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import {MatBadgeModule} from '@angular/material/badge'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { VendordashboardComponent } from './vendordashboard/vendordashboard.component';
import { AutoclearstoreComponent } from './autoclearstore/autoclearstore.component'; 
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { VendorsComponent } from './vendors/vendors.component';
import { CustomersComponent } from './customers/customers.component';
import { OrdersComponent } from './orders/orders.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { RolesComponent } from './roles/user-roles.component';
import { ResetPassWordComponent } from './reset-pass-word/reset-pass-word.component';
import { LogoutComponent } from './user/logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { PromotionsComponent } from './promotions/promotions.component';
import { ProductsComponent } from './products/products.component';
import { ReturnsComponent } from './returns/returns.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { UserAccountComponent } from './UserAccount/user-account.component';
import { FooterComponent } from './footer/footer.component';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { AddEditVendorComponent } from './vendors/edit-vendor/add-edit-vendor.component';
import { AddEditCustomerComponent } from './customers/add-edit-customer/add-edit-customer.component';
import { ViewCustomerComponent } from './customers/view-customer/view-customer.component';
import { ViewOrderComponent } from './orders/view-order/view-order.component';
import { ViewReviewComponent } from './reviews/view-review/view-review.component';
import { EditPromotionComponent } from './promotions/edit-promotion/edit-promotion.component';
import { ViewVendorComponent } from './vendors/view-vendor/view-vendor.component';
import { UpdateDetailsComponent } from './UserAccount/update-details/update-details.component';
import { DeleteAccountComponent } from './UserAccount/delete-account/delete-account.component';
import { CreateVendorComponent } from './vendors/create-vendor/create-vendor.component';
import { AddReviewComponent } from './reviews/add-review/add-review.component';
import { UpdateReviewComponent } from './reviews/update-review/update-review.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { CustomerReviewsComponent } from './customer-reviews/customer-reviews.component';
import { UpdateUserReviewComponent } from './customer-reviews/update-user-review/update-user-review.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { CartComponent } from './product-catalog/cart/cart.component';
import { CartItemComponent } from './product-catalog/cart/cart-item/cart-item.component';
import { FiltersComponent } from './product-catalog/filters/filters.component';
import { ProductItemComponent } from './product-catalog/product-list/product-item/product-item.component';
import { ProductListComponent } from './product-catalog/product-list/product-list.component';
import { ApplicationComponent } from './application/application.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { CourierComponent } from './courier/courier.component';
import { DashboardOrdersComponent } from './dashboard/dashboard-orders/dashboard-orders.component';
import { BrandsComponent } from './brands/brands.component';
import { TypesComponent } from './types/types.component';
import { CategoriesComponent } from './categories/categories.component';
import { CreateBrandComponent } from './brands/create-brand/create-brand.component';
import { EditBrandComponent } from './brands/edit-brand/edit-brand.component';
import { CreateTypeComponent } from './types/create-type/create-type.component';
import { EditTypeComponent } from './types/edit-type/edit-type.component';
import { CreateCategoryComponent } from './categories/create-category/create-category.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { OrdersReportComponent } from './dashboard/dashboard-orders/orders-report/orders-report.component';
import { ReviewsReportComponent } from './reviews/reviews-report/reviews-report.component';
import { DashboardReviewComponent } from './reviews/dashboard-review/dashboard-review.component';
import { SaleComponent } from './sale/sale.component';
import { SalesReportComponent } from './sale/sales-report/sales-report.component';
import { AddCourierComponent } from './courier/add-courier/add-courier.component';
import { UpdateCourierComponent } from './courier/update-courier/update-courier.component';
import { AddPromotionComponent } from './promotions/add-promotion/add-promotion.component';
import { RequestAccountDeletionComponent } from './vendors/request-account-deletion/request-account-deletion.component';
import { OnSaleComponent } from './promotions/onsale/on-sale.component';
import { PaymentsuccessformComponent } from './paymentsuccessform/paymentsuccessform.component';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { UserOrdersComponent } from './UserAccount/userorders/user-orders.component';
import { EditRoleComponent } from './roles/edit-role/edit-role.component';
import { UsersStatsComponent } from './dashboard/users-stats/users-stats.component';
import { OrdersStatsComponent } from './dashboard/orders-stats/orders-stats.component';
import { ProductsStatsComponent } from './dashboard/products-stats/products-stats.component';
import { VendorsStatsComponent } from './dashboard/vendors-stats/vendors-stats.component';
import { StatisticsReportComponent } from './dashboard/statistics-report/statistics-report.component';
import { AssignOrderComponent } from './courier/assign-order/assign-order.component';
import {MatRadioModule} from '@angular/material/radio'; 
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    AdmindashboardComponent,
    VendordashboardComponent,
    AutoclearstoreComponent,
    BodyComponent,
    SidenavComponent,
    VendorsComponent,
    CustomersComponent,
    OrdersComponent,
    ReviewsComponent,
    InvoicesComponent,
    RolesComponent,
    ResetPassWordComponent,
    LogoutComponent,
    DashboardComponent,
    PromotionsComponent,
    ProductsComponent,
    ReturnsComponent,
    UserAccountComponent,
    FooterComponent,
    ProductCatalogComponent,
    AddEditVendorComponent,
    AddEditCustomerComponent,
    ViewCustomerComponent,
    ViewOrderComponent,
    ViewReviewComponent,
    EditPromotionComponent,
    ViewVendorComponent,
    UpdateDetailsComponent,
    DeleteAccountComponent,
    CreateVendorComponent,
    AddReviewComponent,
    UpdateReviewComponent,
    SingleProductComponent,
    CustomerReviewsComponent,
    UpdateUserReviewComponent,
    CreateProductComponent,
    EditProductComponent,
    CartItemComponent,
    CartComponent,
    ProductItemComponent,
    ProductListComponent,
    FiltersComponent,
    ApplicationComponent,
    ShoppingCartComponent,
    WishlistComponent,
    CourierComponent,
    DashboardOrdersComponent,
    BrandsComponent,
    TypesComponent,
    CategoriesComponent,
    CreateBrandComponent,
    EditBrandComponent,
    CreateTypeComponent,
    EditTypeComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    OrdersReportComponent,
    ReviewsReportComponent,
    DashboardReviewComponent,
    SaleComponent,
    SalesReportComponent,
    AddCourierComponent,
    UpdateCourierComponent,
    AddPromotionComponent,
    RequestAccountDeletionComponent,
    OnSaleComponent,
    PaymentsuccessformComponent,
    SubscribersComponent,
    UserOrdersComponent,
    EditRoleComponent,
    UsersStatsComponent,
    OrdersStatsComponent,
    ProductsStatsComponent,
    VendorsStatsComponent,
    StatisticsReportComponent,
    AssignOrderComponent,
    ForgotPasswordComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ progressBar: true}),
    RouterModule,
    DataTablesModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MDBBootstrapModule.forRoot(),
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    NgxFeedbackModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTabsModule,
    NgxStarRatingModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatBadgeModule,
    MatTableExporterModule,
    MatCarouselModule.forRoot(),
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
