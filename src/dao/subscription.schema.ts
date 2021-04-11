import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubscriptionDocument = Subscription & Document;

@Schema({ timestamps: true, versionKey: false })
export class Subscription {
  @Prop({ required: true, unique: true, index: true })
  email: string;
  @Prop({ required: true })
  dateOfBirth: number;
  @Prop({ required: true })
  flagForConsent: boolean;
  @Prop({ required: true })
  newsletterId: string;
  @Prop()
  firstName: string;
  @Prop({ enum: ['MALE', 'FEMALE'] })
  gender: string;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
