import organizationSchema, { IOrganization } from './organization.model'
import { Document, model, Schema } from 'mongoose'

export interface IUser extends Document {
  name: string
  password: string
  orgnization: IOrganization
}

// this.orgnization = organizations.find(
//   (o) => o.name === orgnizationName
// ) as IOrganization

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'name must be provided'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'password must be provided'],
    minlength: [4, 'passwod must be at least 4 chars']
  },
  orgnization: {
    type: organizationSchema,
    required: [true, 'user must heve organization']
  }
})

export default model<IUser>('User', userSchema)