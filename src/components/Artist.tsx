import Image from "next/image";

export interface Artist {
  external_urls: ExternalUrls;
  followers: Followers;
  genres?: string[] | null;
  href: string;
  id: string;
  images?: ImagesEntity[] | null;
  name: string;
  popularity: number;
  type: string;
  uri: string;
}
export interface ExternalUrls {
  spotify: string;
}
export interface Followers {
  href?: null;
  total: number;
}
export interface ImagesEntity {
  height: number;
  url: string;
  width: number;
}

export default function Artist({ item }) {
  const artist: Artist = item as Artist;
  return (
    <div className="w-1/6 flex-shrink-0 rounded bg-green-100/70 p-2">
      <a href={artist.external_urls.spotify} target="_blank">
        <h1
          className="mb-1 truncate text-xl font-bold text-slate-900"
          title={artist.name}
        >
          {artist.name}
        </h1>
        {artist.images.length > 0 && (
          <Image
            src={artist.images[0].url}
            width={artist.images[0].width}
            height={artist.images[0].height}
            alt={artist.name}
          />
        )}
      </a>
    </div>
  );
}
