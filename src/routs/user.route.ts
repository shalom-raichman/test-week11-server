import { Request, Response } from 'express'
import { UserLoginDTO, UserRegisterDTO } from '../DTO/user.DTO'
import { getUserProfile, loginService, registerService } from '../services/user.service'

export const register = async (req: Request<any, any, UserRegisterDTO>, res: Response) => {
  try {
    const registerdUser = await registerService(req.body)    
    res.status(201).json({
      msg: 'User registered successsfuly',
      err: false,
      data: registerdUser
    })
  } catch (err) {
    res.status(400).json({
      msg: (err as Error).message,
      err: true,
      data: null
    })
  }
}
export const login = async (req: Request<any, any, UserLoginDTO>, res: Response) => {
  try {
    const logedUser = await loginService(req.body)
    res.status(201).json({
      msg: 'User login successfuly',
      err: false,
      data: logedUser
    })
  } catch (err) {
    res.status(400).json({
      msg: (err as Error).message,
      err: true,
      data: null
    })
    console.error(err)
  }
}

export const profile = async (
  req: Request<any, any, { id: string }>,
  res: Response
) => {
  try {
    const user = await getUserProfile(req.body.id)
    res.status(200).json(user)
  } catch (err) {
    res.status(400).json((err as Error).message)
  }
}
