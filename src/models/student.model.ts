import { Schema, Document, model } from 'mongoose';

interface StudentProfileImage {
  name: string;
  key?: string;
  url?: string;
}

interface IStudent extends Document {
  firstName: string;
  lastName: string;
  email: string;
  avatar: StudentProfileImage;
  interests: Array<string>;
  phone?: string;
  password?: string;
  joinedAt: Date;
  isGoogleUser: boolean;
  isBlocked: boolean;
  blockedReason: string;
}

const ProfileSchema = new Schema<StudentProfileImage>({
  name: {
    type: String
  },
  key: {
    type: String
  },
  url: {
    type: String
  }
});

const studentSchema = new Schema<IStudent>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    match: [/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/, 'Please enter a valid email']
  },
  avatar: {
    type: ProfileSchema,
    required: false
  },
  phone: {
    type: String,
    required: function (this: IStudent) {
      return !this.isGoogleUser; // Required for non-Google users
    },
    trim: true,
    unique: true,
    sparse: true, // Allow multiple null values
    match: [/^01[0125][0-9]{8}$/, 'Please enter a valid Egyptian phone number']
  },
  interests: {
    type: [String],
    required: true,
    default: []
  },
  password: {
    type: String,
    required: function (this: IStudent) {
      return !this.isGoogleUser;
    },
    minlength: [8, 'Password must be at least 8 characters']
  },
  joinedAt: {
    type: Date,
    default: Date.now
  },
  isGoogleUser: {
    type: Boolean,
    default: false
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  blockedReason: {
    type: String,
    default: ''
  }
});

const Student = model<IStudent>('Student', studentSchema);

export default Student;
