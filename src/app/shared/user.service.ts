import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from './user';
import { Observable } from 'rxjs';
import { Vendor } from './vendor';
import { Customer } from './customer';
import { Products } from './products';
import { Application } from '../application/models/application';
import { Brands } from '../products/create-product/brands';
import { Categories } from '../products/create-product/categories';
import { Types } from '../products/create-product/types';
import { Newsletter } from './newsletter';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public ResetPassword(form: any)
  {
    return this.http.post(environment.apiURL + 'ResetPassword/SendEmail', form);
  }
  
  /*********************************USERS CRUDS*************************/
  public register(formRegistration: User)
  {
    return this.http.post(environment.apiURL + 'Users/Register', formRegistration);
  }

  public login(formLogin: User)
  {
    return this.http.post(environment.apiURL + 'Users/Login', formLogin);
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUsersList() : Observable<User[]>
  {
    return this.http.get<User[]>(environment.apiURL + 'Users/getAllUsers');
  }
  getUserById(UserId: any): Observable<User>
  {
    return this.http.get<User>(`${environment.apiURL + 'Users'}/${UserId}`);
  }

  updateUser(UserId: any, editForm: User): Observable<User>
  {
    return this.http.put<User>(`${environment.apiURL + 'Users/updateUser?id='}${UserId}`, editForm);
  }

  deleteUser(UserId: any): Observable<Object>
  {
    return this.http.delete(`${environment.apiURL + 'Users/deleteUser'}/${UserId}`);
  }

  /*********************************Newsletter CRUDS*************************/

  CreateNewsletter(subscriberForm: Newsletter): Observable<Object>
  {
    return this.http.post(`${environment.apiURL + 'Newsletters/CreateNewsletter'}`, subscriberForm);
  }

  getNewsletterList() : Observable<Newsletter[]>
  {
    //add relevant api endpoint
    return this.http.get<Newsletter[]>(environment.apiURL + 'Newsletters');
  }

  getNewsletterById(Id: number): Observable<Newsletter>
  {
    return this.http.get<Newsletter>(`${environment.apiURL + 'Newsletters'}/${Id}`);
  }

  updateNewsletter(Id: number, newsletter: Newsletter): Observable<Object>
  {
    return this.http.put(`${environment.apiURL + 'Newsletters'}/${Id}`, newsletter);
  }

  deleteNewsletter(Id: number): Observable<Object>
  {
    return this.http.delete(`${environment.apiURL + 'Newsletters'}/${Id}`);
  }

  /*********************************Brand CRUDS*************************/
  public getBrands()
  {
    return this.http.get(environment.apiURL + 'Brands/getBrands');
  }

  public deleteBrand(ProductBrandId: number)
  {
    return this.http.delete(`${environment.apiURL + 'Brands'}/${ProductBrandId}`);
  }

  public updateBrand(ProductBrandId: number, brands: Brands): Observable<Object>
  {
    return this.http.put(`${environment.apiURL + 'Brands'}/${ProductBrandId}`, brands);
  }

  public addBrands(createForm: Brands)
  {
    return this.http.post(environment.apiURL + 'Brands/addBrand', createForm);
  }

  public getBrandById(ProductBrandId: number): Observable<Brands>
  {
    return this.http.get<Brands>(`${environment.apiURL + 'Brands'}/${ProductBrandId}`);
  }

   /*********************************Category CRUDS*************************/
  public getCategories()
  {
    return this.http.get(environment.apiURL + 'Category/getCategories');
  }

  public deleteCategory(ProductCategoryId: number)
  {
    return this.http.delete(`${environment.apiURL + 'Category'}/${ProductCategoryId}`);
  }

  public updateCategory(ProductCategoryId: number, categories: Categories): Observable<Object>
  {
    return this.http.put(`${environment.apiURL + 'Category'}/${ProductCategoryId}`, categories);
  }

  public addCategory(createForm: Categories)
  {
    return this.http.post(environment.apiURL + 'Category/addCategory', createForm);
  }

  public getCategoryById(ProductCategoryId: number): Observable<Categories>
  {
    return this.http.get<Categories>(`${environment.apiURL + 'Category'}/${ProductCategoryId}`);
  }

  /*********************************Types CRUDS*************************/
  public getTypes()
  {
    return this.http.get(environment.apiURL + 'Type/getTypes');
  }

  public deleteType(ProductTypeId: number)
  {
    return this.http.delete(`${environment.apiURL + 'Type'}/${ProductTypeId}`);
  }

  public updateType(ProductTypeId: number, types: Types): Observable<Object>
  {
    return this.http.put(`${environment.apiURL + 'Type'}/${ProductTypeId}`, types);
  }

  public addType(createForm: Types)
  {
    return this.http.post(environment.apiURL + 'Type/addType', createForm);
  }

  public getTypeById(ProductTypeId: number): Observable<Types>
  {
    return this.http.get<Types>(`${environment.apiURL + 'Type'}/${ProductTypeId}`);
  }

  /*********************************APPLICATION CRUDS*************************/

  public apply(formApply: Application)
  {
    return this.http.post(environment.apiURL + 'Applications/createApplication', formApply);
  }

  /*********************************VENDOR CRUDS*************************/
  CreateVendor(createForm: Vendor): Observable<Object>
  {
    return this.http.post(`${environment.apiURL + 'Vendors/CreateVendor'}`, createForm);
  }

  getVendorsList() : Observable<Vendor[]>
  {
    return this.http.get<Vendor[]>(environment.apiURL + 'Vendors/GetVendors');
  }

  getVendorById(VendorId: number): Observable<Vendor>
  {
    return this.http.get<Vendor>(`${environment.apiURL + 'Vendors'}/${VendorId}`);
  }

  updateVendor(VendorId: number, vendor: Vendor): Observable<Object>
  {
    return this.http.put(`${environment.apiURL + 'Vendors'}/${VendorId}`, vendor);
  }

  deleteVendor(VendorId: number): Observable<Object>
  {
    return this.http.delete(`${environment.apiURL + 'Vendors'}/${VendorId}`);
  }

  /*********************************CUSTOMER CRUDS*************************/
  //for all system vendors
  getCustomersList() : Observable<Customer[]>
  {
    //add relevant api endpoint
    return this.http.get<Customer[]>(environment.apiURL + 'Customers');
  }

  getCustomerById(Id: number): Observable<Customer>
  {
    return this.http.get<Customer>(`${environment.apiURL + 'Customers'}/${Id}`);
  }

  updateCustomer(Id: number, customer: Customer): Observable<Object>
  {
    return this.http.put(`${environment.apiURL + 'Customers'}/${Id}`, customer);
  }

  deleteCustomer(Id: number): Observable<Object>
  {
    return this.http.delete(`${environment.apiURL + 'Customers'}/${Id}`);
  }

  /*********************************PRODUCT CRUDS*************************/
  public getProducts()
  {
    return this.http.get(environment.apiURL + 'Products/getProducts');
  }

  public deleteProduct(ProductId: number)
  {
    return this.http.delete(`${environment.apiURL + 'Products'}/${ProductId}`);
  }

  public updateProducts(ProductId: number, products: Products): Observable<Object>
  {
    return this.http.put(`${environment.apiURL + 'Products'}/${ProductId}`, products);
  }

  public addProducts(createForm: Products)
  {
    return this.http.post(environment.apiURL + 'Products/addProducts', createForm);
  }

  public getProductById(ProductId: number): Observable<Products>
  {
    return this.http.get<Products>(`${environment.apiURL + 'Products'}/${ProductId}`);
  }

}