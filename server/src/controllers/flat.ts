import { Flat } from "./../entities/Flat";
import { getRepository } from "typeorm";
import { Request, Response } from "express";

export const flatGetId = async (id: string) => {
  const results = await getRepository(Flat).findOne(id);
  return results;
};

export const flatGetName = async (req: Request, res: Response) => {
  const results = await getRepository(Flat).findOne({
    name: req.params.name
  });
  return res.send(results);
};

export const flatPost = async (req: Request, res: Response) => {
  const flat = await getRepository(Flat).create(req.body);
  const results = await getRepository(Flat).save(flat);
  return res.send(results);
};
