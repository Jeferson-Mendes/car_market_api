import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import ICar from '../interfaces/car';


const CarSchema: Schema = new Schema ({
    name: { type: String, required: true },
    image: { type: String, required: true },
    details: { type: [String] },
    diesel: { type: Boolean },
    car_brand: { type: String, required: true },
    category: { type: String, required: true },
    year: { type: String, required: true },
    color: { type: String },
    price: { type: Number, required: true },
    uf: { type: String, required: true },
    city: { type: String, required: true },
    authorName: { type: String, required: true },
    authorId: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ICar>('Car', CarSchema );