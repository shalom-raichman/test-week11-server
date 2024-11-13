import { Request, Response } from 'express'
import { UserLoginDTO, UserRegisterDTO } from '../DTO/user.DTO'
import { loginService, registerService } from '../services/user.service'

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
  }
}
