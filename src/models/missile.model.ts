import { Schema } from 'mongoose'

export interface IMissile extends Document{
  name: string
  description: string
  speed: number
  intercepts: string[]
  price: number
}

const missileSchema = new Schema<IMissile>({
  name: String,
  description: String,
  speed: Number,
  intercepts: [String],
  price: Number
})


export default missileSchema