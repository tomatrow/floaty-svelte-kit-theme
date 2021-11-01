export interface DefaultItem {
    label: string
    href: string
    items?: DefaultItem[]
}

export interface Item<Subitem extends Item = DefaultItem> {
    label: string
    href: string
    items?: Subitem[]
}

export interface ImageItem extends Item {
    src?: string
}

export type Menu = Item<ImageItem>[]
