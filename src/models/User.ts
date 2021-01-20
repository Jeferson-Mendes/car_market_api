import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import IUser from '../interfaces/User';

import bcrypt from 'bcrypt';
const saltRounds = 10;

const UserSchema: Schema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true, select: false },
      whatsapp: { type: String }
    },
    {
        timestamps: true
    }
)

UserSchema.pre<IUser>('save', async function (next) {
    const hash =  await bcrypt.hash(this.password, saltRounds)
    this.password = hash
    next()
})

export default mongoose.model<IUser>('User', UserSchema)