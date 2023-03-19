import spotifyApi from "~/utils/spotifyApi";
import { type Account } from "~/utils/types";

const getAlbums = async (account: Account, search_term: string) => {
  const api = spotifyApi(account?.access_token);
  const response = await api
    .get("search", {
      searchParams: {
        country: "US",
        limit: 50,
        q: search_term,
        type: "album,artist,track",
      },
    })
    .json();
  return response;
};

export default getAlbums;
