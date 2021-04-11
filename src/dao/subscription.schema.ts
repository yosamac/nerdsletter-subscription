import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubscriptionDocument = Subscription & Document;

@Schema()
export class Subscription {
  @Prop()
  email: string;
  @Prop()
  dateOfBirth: number;
  @Prop()
  flagForConsent: boolean;
  @Prop()
  newsletterId: string;
  @Prop()
  firstName: string;
  @Prop()
  gender: string;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
