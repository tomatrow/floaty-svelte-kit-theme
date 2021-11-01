<script lang="ts">
    import type { Menu, ImageItem } from "$lib/index.type"
    import Hover from "$lib/Hover.svelte"
    import { fly } from "svelte/transition"

    let clazz = ""
    export { clazz as class }
    export let menu: Menu = []    
    
    export let collapsed: boolean = undefined
    
    function isMega(items?: ImageItem[]) {
        return items?.every(item => item.src)
    }
</script>

<header class="flex items-center gap-4 fixed top-0 left-0 right-0 {clazz}" {...$$restProps}>
    <slot name="before" {collapsed} />
    <nav class="flex gap-4 flex-wrap">
        {#each menu as { label, href, items }}
            <Hover class="{!isMega(items) ? 'relative' : ''} overflow-visible flex justify-center items-center" let:hovering>
                <a {href} class="px-4 py-2">
                    <slot name="primary" {label} {collapsed}>{label}</slot>
                </a>
                {#if hovering}
                    {#if isMega(items)}
                        <div transition:fly={{ y: 25, duration: 250 }} class="bg-white absolute top-[100%] left-0 right-0 shadow-lg grid grid-cols-5 z-20 gap-4 p-4">
                            {#each (items ?? []) as { label, href, src, items }, index}
                                <div transition:fly={{ y: 25, duration: 250, delay: 50*index }} class="flex flex-col gap-1">
                                    <a {href} class="block aspect-w-16 aspect-h-9"><img class="object-cover" alt={label} {src} /></a>
                                    <a {href} class="my-4"><slot name="secondary" {label}>{label}</slot></a>
                                    {#each (items ?? []) as {label, href}}
                                        <a {href}>
                                            <slot name="tertiary" {label}>{label}</slot>
                                        </a>
                                    {/each}
                                </div>
                            {/each}
                        </div>
                    {:else}
                        <div transition:fly={{ y: 25, duration: 250 }} class="absolute top-[100%] left-0 w-auto shadow-lg flex flex-col">
                            {#each (items ?? []) as { label, href, items }}
                                <Hover let:hovering class="flex flex-col relative z-10">
                                    <a {href} class="whitespace-nowrap py-3 px-5 duration-300 hover:bg-gray-100">
                                        <slot name="secondary" {label}>{label}</slot>
                                    </a>
                                    {#if hovering}
                                        <div transition:fly={{ x: 25, duration: 250 }} class="absolute top-0 left-[100%] flex flex-col shadow-xl bg-white"
                                        >
                                            {#each (items ?? []) as { label, href }}
                                                <a {href} class="px-5 duration-300 py-3 whitespace-nowrap hover:bg-gray-100">
                                                    <slot name="tertiary" {label}>{label}</slot>
                                                </a>
                                            {/each}
                                        </div>
                                    {/if}
                                </Hover>
                            {/each}
                        </div>
                    {/if}
                {/if}
            </Hover>
        {/each}
    </nav>
    <slot name="after" {collapsed} />
</header>
