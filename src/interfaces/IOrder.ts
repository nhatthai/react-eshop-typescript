import {IOrderItem} from './IOrderItem';

export interface IOrder {
    city: number;
    street: string;
    state: string;
    country: number;
    zipCode: string;
    cardNumber: string;
    cardExpiration: Date;
    expiration: string;
    cardSecurityNumber: string;
    cardHolderName: string;
    cardTypeId: number;
    buyer: string;
    orderNumber: string;
    total: number;
    orderItems: IOrderItem[];
    date: Date;
    status: string;
}