import { model, Schema, Document } from 'mongoose'

export interface IResource {
  name: string
  amount: number
}

const resourceSchema = new Schema<IResource>({
  name: String,
  amount: Number
})

export default resourceSchema