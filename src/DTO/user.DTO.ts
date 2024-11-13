import { OrgnizationsEnum } from '../enums/orgnizationEnum'

export interface UserLoginDTO {
  name: string
  password: string
}

export interface UserRegisterDTO extends UserLoginDTO{
  orgnizationName: OrgnizationsEnum
}