import { Document } from 'mongoose';

export default interface ICar extends Document {
    name: string;
    color: string;
    year: number;
    price: number;
}