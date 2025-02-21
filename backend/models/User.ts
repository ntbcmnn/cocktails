import mongoose, {HydratedDocument, Model} from "mongoose";
import bcrypt from 'bcrypt';
import {UserFields} from "../types";
import {randomUUID} from "node:crypto";

interface UserMethods {
    comparePassword(password: string): Promise<boolean>;

    generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>

const Schema = mongoose.Schema;

const regexEmail = /^(\w+[-.]?\w+)@(\w+)([.-]?\w+)?(\.[a-zA-Z]{2,3})$/;

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema<
    HydratedDocument<UserFields>,
    UserModel,
    UserMethods
>({
    password: {
        type: String,
        validate: [
            {
                validator: function (value: string): boolean {
                    return value === value.trim();
                },
                message: "The password must not consist of or contain spaces.",
            },
            {
                validator: function (value: string): boolean {
                    return value.trim().length > 0;
                },
                message: "Fill in the password.",
            },
        ],
    },
    email: {
        type: String,
        unique: true,
        validate: [
            {
                validator: async function (this: HydratedDocument<UserFields>, value: string): Promise<boolean> {
                    if (!this.isModified('email')) return true;
                    const user: UserFields | null = await User.findOne({email: value});
                    return !user;
                },
                message: "This email is already taken",
            },
            {
                validator: function (this: HydratedDocument<UserFields>, value: string): boolean {
                    return regexEmail.test(value);
                },
                message: "Invalid email format",
            },
        ]
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin'],
    },
    token: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        validate: {
            validator: function (value: string): boolean {
                return value.trim().length > 0;
            },
            message: "Fill in the name to display in your profile.",
        },
    },
    googleID: String,
    avatar: {
        type: String,
        validate: {
            validator: function (this: HydratedDocument<UserFields>, value: string): boolean {
                return value.trim().length > 0;
            },
            message: "Avatar is required",
        }
    },
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
    next();
});

UserSchema.methods.comparePassword = function (password: string) {
    return bcrypt.compare(password, this.password);
}

UserSchema.methods.generateToken = function () {
    this.token = randomUUID();
}

UserSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});


const User = mongoose.model('User', UserSchema);

export default User;
