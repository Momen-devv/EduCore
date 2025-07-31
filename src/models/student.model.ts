import { Schema, Document, model } from 'mongoose';

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
