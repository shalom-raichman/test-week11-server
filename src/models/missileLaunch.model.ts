import { MissileLaunchStatusEnum } from '../enums/MissileLaunchStatusEnum'
import { Document, model, Schema } from 'mongoose'
import { OrgnizationsEnum } from '../enums/orgnizationEnum'

export interface IMissileLaunch extends Document {
  rocketType: string
  timeToHit: number
  status: MissileLaunchStatusEnum
  launchFrom : OrgnizationsEnum,
  launchTo: OrgnizationsEnum
}

const missileLaunchSchema = new Schema<IMissileLaunch>({
  rocketType: String,
  timeToHit: Number,
  status: {
    type: String,
    enum: ['Intercepted', 'Hit', 'Launched'],
  },
  launchFrom: String,
  launchTo: String
})

export default model<IMissileLaunch>('MissileLaunch', missileLaunchSchema)