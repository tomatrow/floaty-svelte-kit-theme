<script lang="ts" context="module">
    import type { Menu } from "$lib"

    const menu: Menu = [
        {
            label: "Shop",
            href: "#",
            items: [
                {
                    label: "Aparrel",
                    href: "#",
                    src: "https://source.unsplash.com/featured/?spring",
                    items: [
                        {
                            label: "Sweatshirts",
                            href: "#"
                        },
                        {
                            label: "T-Shirts",
                            href: "#"
                        },
                        {
                            label: "Shirts",
                            href: "#"
                        },
                        {
                            label: "Jeans",
                            href: "#"
                        },
                        {
                            label: "hats",
                            href: "#"
                        }
                    ]
                },
                {
                    label: "Outerwear",
                    href: "#",
                    src: "https://source.unsplash.com/featured/?summer",
                    items: [
                        {
                            label: "Jackets",
                            href: "#"
                        },
                        {
                            label: "Vests",
                            href: "#"
                        },
                        {
                            label: "Rain Wear",
                            href: "#"
                        }
                    ]
                },
                {
                    label: "Accessories",
                    href: "#",
                    src: "https://source.unsplash.com/featured/?fall",
                    items: [
                        {
                            label: "Socks",
                            href: "#"
                        },
                        {
                            label: "Hats",
                            href: "#"
                        }
                    ]
                },
                {
                    label: "Homegoods",
                    href: "#",
                    src: "https://source.unsplash.com/featured/?winter",
                    items: [
                        {
                            label: "Grooming",
                            href: "#"
                        }
                    ]
                }
            ]
        },
        {
            label: "New Arrivals",
            href: "#"
        },
        {
            label: "Best Sellers",
            href: "#"
        },
        {
            label: "Shop by Brand",
            href: "#",
            items: [
                {
                    label: "Muttonhead",
                    href: "#"
                },
                {
                    label: "Nakend and Famous",
                    href: "#"
                },
                {
                    label: "Juniper Ridge",
                    href: "#"
                },
                {
                    label: "Bather",
                    href: "#"
                },
                {
                    label: "Beside",
                    href: "#",
                    items: [
                        {
                            label: "One",
                            href: "#"
                        },
                        {
                            label: "Two",
                            href: "#"
                        },
                        {
                            label: "Three",
                            href: "#"
                        }
                    ]
                }
            ]
        },
        {
            label: "Theme Features",
            href: "#"
        }
    ]
    
    // menu[0].items = [...menu[0].items, ...menu[0].items, ...menu[0].items, ...menu[0].items]
</script>

<script lang="ts">
    import { Navbar } from "$lib"
</script>

<Navbar {menu} class="py-4" >
    <a slot="before" let:collapsed href="#" class="mr-4 h-16 flex items-center justify-center bg-gray-100 px-4">
        <span class:underline={collapsed} class="font-black tracking-wider">APRL.</span>
    </a>
    <div slot="after" let:collapsed class:ml-auto={!collapsed}>
        {#if collapsed}
            Mobile Menu Footer
        {:else}
            HAM
        {/if}
    </div>
    <span slot="primary" class="hover:underline" let:collapsed let:label>{label}</span>
    <span slot="secondary" let:collapsed let:compact let:label>{label}</span>
    <!-- <span slot="tertiary" let:collapsed let:compact let:label>{label}</span> -->
</Navbar>
 
