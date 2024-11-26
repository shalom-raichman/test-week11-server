import { compare, hash } from 'bcrypt'
import { UserLoginDTO, UserRegisterDTO } from '../DTO/user.DTO'
import organizations from '../data/organizations.json'
import userModel, { IUser } from '../models/user.model'
import { IOrganization } from '../models/organization.model'
import jwt  from 'jsonwebtoken'

export const registerService = async (user: UserRegisterDTO) => {
  try {
    const newUser = {
      name: user.name,
      password: await hash(user.password, 10),
      orgnization: organizations.find(
        (o) => o.name === user.orgnizationName
      ) as IOrganization,
    }

    const dbUser = new userModel(newUser)
    return await dbUser.save()
  } catch (err) {
    throw err
  }
}

export const loginService = async (user: UserLoginDTO) => {
  try {
    if (!user.password || !user.name)
      throw new Error('Missing user data')
    const dbUser = await userModel.findOne({ name: user.name }).lean()
    if (!dbUser) throw new Error('User not found')
    const metch = await compare(user.password, dbUser.password)
    if (!metch) throw new Error('Wrong password')

    const token = jwt.sign({
      user_id: dbUser._id,
      username: dbUser.password,
      organization: dbUser.orgnization.name
    }, process.env.JWT_SECRET || 'defualt', {
      expiresIn: '10m'
    })
    return {...dbUser, token, password: '*******'}
  } catch (err) {
    throw err
  }
}


export const getUserProfile = async (id: string) => {
  try {
    if(!id) throw new Error('id is requierd');
    const user = await userModel.findById(id)
    if(!user) throw new Error('user not found');
    return user
  } catch (err) {
    throw err
  }
}
