import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongooseDelete from 'mongoose-delete';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
   @Prop()
   lastname: string;

   @Prop()
   firstname: string;

   @Prop()
   username: string;

   @Prop()
   password: string;

   @Prop()
   email: string;

   @Prop()
   phone: string;

   @Prop()
   role: string;
}

// Tạo schema từ class User
const UserSchema = SchemaFactory.createForClass(User);

// Áp dụng plugin mongoose-delete cho UserSchema
UserSchema.plugin(mongooseDelete, {
   deletedAt: true,
   overrideMethods: 'all'
});

export { UserSchema };
