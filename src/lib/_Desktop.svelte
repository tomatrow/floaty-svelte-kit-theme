<script lang="ts">
    import type { Menu, ImageItem } from "$lib/index.type"
    import Hover from "$lib/Hover.svelte"
    import { fly } from "svelte/transition"
    import Mega from "$lib/_Mega.svelte"
    import { flyLift } from "$lib/_common"
    import { preloadImage } from "$lib/_utility"

    export let menu: Menu

    function isMega(items?: ImageItem[]) {
        return items?.every(item => item.src)
    }
    
    let preload = false
    $: if (preload) {
        menu.flatMap(item => item.items?.map(item => item.src) ?? [])
            .filter(Boolean)
            .map(preloadImage)
    }
</script>

<nav class="hide-mobile flex gap-4 flex-wrap" on:mouseover={() => (preload = true)}>
    {#each (menu ?? []) as { label, href, items }}
        <Hover let:hovering class="relative overflow-visible flex justify-center items-center">
            <a {href} class="px-4 py-2">
                <slot name="primary" {label} />
            </a>
            {#if hovering}
                {#if isMega(items)}
                    <Mega class="bg-white shadow-lg z-10 gap-4 p-4">
                        {#each (items ?? []) as { label, href, src, items }, index}
                            <div transition:fly={{ y: 25, duration: 250, delay: 50*index }} class="flex flex-col gap-1">
                                <a {href} class="block aspect-w-16 aspect-h-9"><img class="object-cover" alt={label} {src} /></a>
                                <a {href} class="my-4"><slot name="secondary" {label} compact={false} /></a>
                                {#each (items ?? []) as {label, href}}
                                    <a {href}>
                                        <slot name="tertiary" {label} compact={false} />
                                    </a>
                                {/each}
                            </div>
                        {/each}
                    </Mega>
                {:else}
                    <div transition:fly={flyLift} class="absolute top-[100%] left-0 w-auto shadow-lg flex flex-col">
                        {#each (items ?? []) as { label, href, items }}
                            <Hover let:hovering class="flex flex-col relative z-10">
                                <a {href} class="whitespace-nowrap py-3 px-5 duration-300 hover:bg-gray-100">
                                    <slot name="secondary" {label} compact />
                                </a>
                                {#if hovering}
                                    <div transition:fly={{ x: 25, duration: 250 }} class="absolute top-0 left-[100%] flex flex-col shadow-xl bg-white"
                                    >
                                        {#each (items ?? []) as { label, href }}
                                            <a {href} class="px-5 duration-300 py-3 whitespace-nowrap hover:bg-gray-100">
                                                <slot name="tertiary" compact {label} />
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
