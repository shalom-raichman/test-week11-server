import IResource from './resource.model'

export default interface IOrganization {
  name: string
  resources: IResource[]
  budget: number
}
