import { Request, Response } from "express";

// import { send } from "../utils/send";
// import { gotClientId, gotToken } from "../got/got";

export const userGet = async (req: Request, res: Response) => {
  const { email, role } = req.user;
  const userSubset = {
    email,
    role
  };
  res.json(userSubset);
};

// export const userGetSubs = async (req: Request, res: Response) => {
//   try {
//     const api = await gotToken(
//       `subscriptions?broadcaster_id=${encodeURIComponent(req.user.twitchId)}`,
//       req
//     );
//     console.log("api", api);
//     return send(req, res, api, userGetSubs);
//   } catch (e) {
//     console.log("ERROR", e);
//   }
// };

// export const userGetFollows = async (req: Request, res: Response) => {
//   try {
//     const api = await gotClientId(
//       `users/follows?from_id=${encodeURIComponent(req.user.twitchId)}`
//     );
//     return send(req, res, api, userGetFollows);
//   } catch (e) {
//     console.log("ERROR", e);
//   }
// };

// export const userGetId = async (req: Request, res: Response) => {
//   const results = await getRepository(User).findOne(req.params.id);
//   return res.send(results);
// };

// export const userPost = async (req: Request, res: Response) => {
//   const user = await getRepository(User).create(req.body);
//   const results = await getRepository(User).save(user);
//   return res.send(results);
// };

// export const userPutId = async (req: Request, res: Response) => {
//   const user = await getRepository(User).findOne(req.params.id);
//   await getRepository(User).merge(user, req.body);
//   const results = await getRepository(User).save(user);
//   return res.send(results);
// };

// export const userDeleteId = async (req: Request, res: Response) => {
//   const results = await getRepository(User).remove(req.params.id);
//   return res.send(results);
// };
