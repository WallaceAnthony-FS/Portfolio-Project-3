import ky from "ky-universal";

export default function spotifyApi(access_token: string) {
  const api = ky.create({
    prefixUrl: "https://api.spotify.com/v1",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });

  return api;
}
