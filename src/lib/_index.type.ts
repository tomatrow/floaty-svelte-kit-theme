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

export type LeafItem = Item<never>

export type PrimaryMenu = Item<ImageItem>[]
export type SecondaryMenu = Item<LeafItem>[]
type f = Partial<{ hello: string }>
export interface LinkSlot extends Omit<DefaultItem, "items"> {
    level: number
}

export interface DynamicLinkSlot extends LinkSlot {
    compact: boolean
}

export interface ImageLinkSlot extends LinkSlot {
    src: string
}
