export class Order{
    OrderId!:number;
    OrderStatusId!:number 
    Date!:Date;
    Quantity!:number;
    Total!:number;
    Status!:string; 
    FirstName!:string;
    LastName!: string;
    BillingAddress!:string;
    ShippingAddress!: string;
    UserId!: any;
}