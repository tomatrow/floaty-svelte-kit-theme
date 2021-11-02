<script lang="ts" context="module">
    import type { Menu } from "$lib"

    const menu: Menu = [
        {
            label: "Sore",
            href: "#",
            items: [
                {
                    label: "Farrel",
                    href: "#",
                    src: "https://source.unsplash.com/featured/?spring",
                    items: [
                        {
                            label: "Fearn",
                            href: "#"
                        },
                        {
                            label: "Narn",
                            href: "#"
                        },
                        {
                            label: "Far",
                            href: "#"
                        },
                        {
                            label: "Side",
                            href: "#"
                        },
                        {
                            label: "Pan",
                            href: "#"
                        }
                    ]
                },
                {
                    label: "Inside",
                    href: "#",
                    src: "https://source.unsplash.com/featured/?summer",
                    items: [
                        {
                            label: "!st",
                            href: "#"
                        },
                        {
                            label: "Dolls",
                            href: "#"
                        },
                        {
                            label: "Books",
                            href: "#"
                        }
                    ]
                },
                {
                    label: "Burnside",
                    href: "#",
                    src: "https://source.unsplash.com/featured/?fall",
                    items: [
                        {
                            label: "Cares",
                            href: "#"
                        },
                        {
                            label: "Cans",
                            href: "#"
                        }
                    ]
                },
                {
                    label: "Barna",
                    href: "#",
                    src: "https://source.unsplash.com/featured/?winter",
                    items: [
                        {
                            label: "Cantrip",
                            href: "#"
                        }
                    ]
                }
            ]
        },
        {
            label: "Quallo",
            href: "#"
        },
        {
            label: "Solar",
            href: "#"
        },
        {
            label: "Blueberry",
            href: "#",
            items: [
                {
                    label: "Shard",
                    href: "#"
                },
                {
                    label: "Storm",
                    href: "#"
                },
                {
                    label: "Chachel",
                    href: "#"
                },
                {
                    label: "Cats",
                    href: "#"
                },
                {
                    label: "Bears",
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
            label: "Tambor",
            href: "#"
        }
    ]
</script>

<script lang="ts">
    import { Desktop, Mobile } from "$lib"
    import { Menu, Cross } from "$lib/svgs"

    let open: boolean
</script>

<header class="flex items-center gap-4 fixed top-0 left-0 right-0 p-4">
    <div class="mr-auto">LOGO</div>

    <Desktop class="mx-auto hide-mobile gap-4" {menu}>
        <svelte:fragment slot="primary" let:href let:label>
            <a class="p-4" {href}>{label}!<a /> </a></svelte:fragment
        >
        <svelte:fragment slot="secondary" let:href let:label let:compact>
            <a
                class="py-4 {compact
                    ? 'px-4 duration-200 hover:bg-gray-100 whitespace-nowrap'
                    : 'font-black'}"
                {href}
                >{label}!<a />
            </a></svelte:fragment
        >
        <svelte:fragment slot="tertiary" let:href let:label let:compact>
            <a class={compact ? "hover:bg-gray-100 duration-200 p-4 whitespace-nowrap" : ""} {href}
                >{label}!<a />
            </a></svelte:fragment
        >
    </Desktop>

    <button class="hide-desktop" type="button" on:click={() => (open = !open)}>
        <Menu class="w-8 h-8" />
    </button>
</header>

{#if open}
    <Mobile {menu} bind:open class="hide-desktop bg-white bg-opacity-80">
        <svelte:fragment slot="link" let:level let:label let:href>
            <a class="hover:underline" {href}>{level}-{label}!</a>
        </svelte:fragment>
        <svelte:fragment slot="close" let:close>
            <button type="button" class="self-end pb-4" on:pointerdown={close}>
                <Cross class="h-8 w-8" />
            </button>
        </svelte:fragment>
    </Mobile>
{/if}

<style global lang="postcss">
    .hide-mobile {
        display: none;
    }

    @screen md {
        .hide-desktop {
            display: none;
        }
        .hide-mobile {
            display: flex;
        }
    }
</style>
