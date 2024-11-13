import { MissileLaunchStatusEnum } from '../enums/MissileLaunchStatusEnum'
import { Document, model, Schema } from 'mongoose'

export interface IMissileLaunch extends Document {
  rocketType: string
  timeToHit: number
  status: MissileLaunchStatusEnum
}

const missileLaunchSchema = new Schema<IMissileLaunch>({
  rocketType: String,
  timeToHit: Number,
  status: {
    type: String,
    enum: ['Intercepted', 'Hit', 'Launched'],
  },
})

export default model<IMissileLaunch>('MissileLaunch', missileLaunchSchema)