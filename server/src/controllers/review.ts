import { flatGetId } from "./flat";
import { userGetCurrent } from "./user";
import { Review } from "../entities/Review";
import { getRepository } from "typeorm";
import { Request, Response } from "express";

export const reviewGetFlat = async (req: Request, res: Response) => {
  const results = await getRepository(Review).findOne({
    relations: ["user", "flat"],
    where: {
      // TODO: Maybe wrong?
      "flat.id": req.params.flatId
    }
  });
  return res.send(results);
};

export const reviewPost = async (req: Request, res: Response) => {
  const user = await userGetCurrent(req);
  const flat = await flatGetId(req.body.flatId);
  const review = await getRepository(Review).create({
    ...req.body.review,
    flat,
    user
  });
  const results = await getRepository(Review).save(review);
  return res.send(results);
};

export const reviewPutId = async (req: Request, res: Response) => {
  const review = await getRepository(Review).findOne(req.params.id);
  if (review.user.id === req.user.id) {
    await getRepository(Review).merge(review, req.body);
    const results = await getRepository(Review).save(review);
    await getRepository(Review).merge(review, req.body);
    return res.send(results);
  } else {
    return res.status(500).send({
      code: 500,
      message: "You can modify only your reviews"
    });
  }
};

export const reviewDeleteId = async (req: Request, res: Response) => {
  const review = await getRepository(Review).findOne(req.params.id);
  if (review.user.id === req.user.id) {
    const results = await getRepository(Review).remove(review);
    return res.send(results);
  } else {
    return res.status(500).send({
      code: 500,
      message: "You can delete only your reviews"
    });
  }
};
