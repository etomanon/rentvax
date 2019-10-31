import { Request } from "express";
import gotOriginal from "got";

export const got = gotOriginal.extend({
  baseUrl: "https://api.twitch.tv/helix",
  json: true
});

export const gotToken = (url: string, req: Request) => {
  return got.get(url, {
    headers: { Authorization: `Bearer ${req.user.accessToken}` }
  });
};

export const gotClientId = (url: string) => {
  return got.get(url, { headers: { "Client-ID": process.env.CLIENT_ID } });
};
