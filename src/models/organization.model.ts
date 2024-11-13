import { Schema } from 'mongoose'
import resourceSchema, { IResource } from './resource.model'

export interface IOrganization {
  name: string
  resources: IResource[]
  budget: number
}

const organizationSchema = new Schema<IOrganization>({
  name: String,
  resources: [resourceSchema],
  budget: Number
})

export default organizationSchema