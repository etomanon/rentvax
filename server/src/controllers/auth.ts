import { Request, Response } from 'express'

export const authGetLogout = (req: Request, res: Response) => {
  req.logout()
  return res.redirect('/')
}
