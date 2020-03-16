import { Flat } from './../entities/Flat'
import { getRepository } from 'typeorm'
import { Request, Response } from 'express'

export const flatGetOrCreate = async (name: string, geom: object) => {
  let result = await getRepository(Flat).findOne({ name })
  if (result) {
    return result
  }
  const flat = await getRepository(Flat).create({
    name,
    geom,
  })
  result = await getRepository(Flat).save(flat)
  return result
}

export const flatGetName = async (req: Request, res: Response) => {
  const results = await getRepository(Flat).findOne({
    name: req.params.name,
  })
  return res.send(results)
}

export const flatPost = async (req: Request, res: Response) => {
  const flat = await getRepository(Flat).create(req.body)
  const results = await getRepository(Flat).save(flat)
  return res.send(results)
}
