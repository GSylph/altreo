import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

// Check if we're running on the client side
const isClient = typeof window !== 'undefined';

export interface IUser extends Document {
    username: string;
    email: string;
    password?: string;
    challengesCompleted: mongoose.Types.ObjectId[];
    completion: number;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

// Only define the schema if we're on the server
const UserSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: [true, 'Please provide a username'],
            unique: true,
            trim: true,
            minlength: [3, 'Username must be at least 3 characters'],
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
            trim: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email',
            ],
        },
        password: {
            type: String,
            minlength: [6, 'Password must be at least 6 characters'],
            select: false, // Don't include password by default in queries
        },
        challengesCompleted: [{
            type: Schema.Types.ObjectId,
            ref: 'Challenge',
        }],
        completion: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.password) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});

// Compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    if (!this.password) return false;

    return bcrypt.compare(candidatePassword, this.password);
};

// Safely handle model initialization
let User: Model<IUser>;

// Only try to access the model on the server
if (!isClient) {
    // Use the special 'mongoose.models' property safely with type checking
    if (mongoose.models && mongoose.models.User) {
        User = mongoose.models.User as Model<IUser>;
    } else if (mongoose.model) {
        // Create the model if it doesn't exist
        User = mongoose.model<IUser>('User', UserSchema);
    } else {
        // Fallback for SSR and other edge cases
        console.error('Mongoose is not fully initialized');
        // Create a placeholder to prevent crashes
        User = {} as Model<IUser>;
    }
} else {
    // Create a placeholder model for client-side
    User = {} as Model<IUser>;
}

export default User; 