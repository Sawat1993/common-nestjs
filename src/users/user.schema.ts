
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    role: String,
    reportsTo: String,
    password: String
});
