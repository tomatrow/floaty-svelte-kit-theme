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

export interface LinkSlot extends Omit<DefaultItem, "items"> {}

export interface DynamicLinkSlot extends LinkSlot {
    compact: boolean
}

export interface ImageLinkSlot extends LinkSlot {
    src: string
}

export interface MobileLinkSlot extends LinkSlot {
    level: number
}
