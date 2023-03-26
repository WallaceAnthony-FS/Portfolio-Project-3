import Image from "next/image";

export interface Track {
  album: Album;
  artists?: ArtistsEntity[] | null;
  available_markets?: string[] | null;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}
export interface Album {
  album_group: string;
  album_type: string;
  artists?: ArtistsEntity[] | null;
  available_markets?: string[] | null;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images?: ImagesEntity[] | null;
  is_playable: boolean;
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}
export interface ArtistsEntity {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
export interface ExternalUrls {
  spotify: string;
}
export interface ImagesEntity {
  height: number;
  url: string;
  width: number;
}
export interface ExternalIds {
  isrc: string;
}

export default function Track({ item }) {
  const track: Track = item as Track;
  return (
    <div className="w-1/6 flex-shrink-0 rounded bg-green-100/70 p-2">
      <a href={track.external_urls.spotify} target="_blank">
        <h1
          className="mb-1 truncate text-xl font-bold text-slate-900"
          title={track.name}
        >
          {track.name}
        </h1>
        <p className="mb-1 truncate text-sm">
          {track.artists.map((artist) => artist.name).join(", ")}
        </p>
        <Image
          src={track.album.images[0].url}
          width={track.album.images[0].width}
          height={track.album.images[0].height}
          alt={track.name}
        />
      </a>
    </div>
  );
}
