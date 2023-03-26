import Image from "next/image"

type AlbumType = {
    id: string
    href: string,
    uri: string,
    release_date: string
    name: string,
    external_urls: {
        spotify: string
    },
    images: [{
        url: string,
        height: number,
        width: number
    }],
    artists: [{
        name: string,
        href: string,
        id: string
    }]
}

export default function Album({ item }){
    const album: AlbumType = item as AlbumType
    return (
        <div className="flex-shrink-0 w-1/6 bg-green-100/70 p-2 rounded">
                <a href={album.external_urls.spotify} target="_blank">
                <h1 className="truncate font-bold text-xl text-slate-900 mb-1" title={album.name}>{album.name}</h1>
                <div>
                    <p title={album.artists.map(artist => artist.name).join(", ")} className="truncate text-sm mb-1">{album.artists.map(artist => artist.name).join(", ")}</p>
                </div>
                <Image src={album.images[0].url} width={album.images[0].width} height={album.images[0].height}  alt={album.name} />
        </a>
            </div>
    )
}