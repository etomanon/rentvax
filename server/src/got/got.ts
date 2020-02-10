import gotOriginal from 'got'

export const got = gotOriginal.extend({
  // baseUrl: "https://api.twitch.tv/helix",
  json: true,
})
