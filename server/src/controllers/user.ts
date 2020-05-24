import { getRepository } from 'typeorm'
import { User } from './../entities/User'
import { Request, Response } from 'express'

export const userGetCurrent = async (req: Request) => {
  const user = await getRepository(User).findOne(req.user.id)
  return user
}

export const userGet = async (req: Request, res: Response) => {
  const { id, email, role } = req.user
  const userSubset = {
    id,
    email,
    role,
  }
  res.json(userSubset)
}
