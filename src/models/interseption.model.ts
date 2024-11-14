import { Document, model, Schema } from 'mongoose'
import missileSchema, { IMissile } from './missile.model'

export enum InterseptStatusEnum {
  Faile = 'Faile',
  Seccess = 'Seccess',
  OnAir = 'On Air',
}

export interface IMissileInterception extends Document {
  name: string
  intersept: IMissile
  status: InterseptStatusEnum
}

const interceptionSchema = new Schema<IMissileInterception>({
  name: String,
  intersept: missileSchema,
  status: {
    type: String,
    enum: ['Faile', 'seccess', 'On Air'],
  },
})

export default model<IMissileInterception>('Intercption', interceptionSchema)
