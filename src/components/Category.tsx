import Image from "next/image"

type CategoryType = {
    href: string,
    id: string,
    name: string,
    icons: [{
        height: number,
        width: number,
        url: string
    }]
}

export default function Category({ item }){
    const category: CategoryType = item as CategoryType
    const icon = category.icons[0]
    return (
        <div className="flex-shrink-0 w-1/6 bg-green-100/70 p-2 rounded">
            <a href="">
            <h1 className="truncate font-bold text-xl text-slate-900 text-center mb-1">{category.name}</h1>
            {icon.url && <Image src={icon.url} height={icon.height ?? 240} width={icon.width ?? 240} alt={category.name}/>}
            </a>
        </div>
    )
}