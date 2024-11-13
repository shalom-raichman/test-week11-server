import IOrganization from './organization.model'
import missiles from '../data/missiles.json'
import organizations from '../data/organizations.json'

export default class User {
  public orgnization: IOrganization
  constructor(
    public name: string,
    public password: string,
    public orgnizationName: string
  ) {
    this.orgnization = organizations.find(
      (o) => o.name === orgnizationName
    ) as IOrganization
    
  }
}
