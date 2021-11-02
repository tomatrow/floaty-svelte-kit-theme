<script lang="ts">
    import type { Menu, ImageItem } from "$lib/_index.type"
    import Hover from "$lib/_Hover.svelte"
    import { fly } from "svelte/transition"
    import Mega from "$lib/_Mega.svelte"
    import { flyLift } from "$lib/_common"
    import { preloadImage } from "$lib/_utility"

    export let menu: Menu
    let clazz = ""
    export { clazz as class }

    function isMega(items?: ImageItem[]) {
        return items?.every(item => item.src)
    }

    function load() {
        menu.flatMap(item => item.items?.map(item => item.src) ?? [])
            .filter(Boolean)
            .map(preloadImage)
    }
</script>

<nav class="flex flex-wrap {clazz}" on:mouseover|once={load}>
    {#each menu ?? [] as { label, href, items }}
        <Hover let:hovering class="relative overflow-visible flex justify-center items-center">
            <slot name="primary" {label} {href}>
                <a {href}>{label}</a>
            </slot>
            {#if hovering}
                {#if isMega(items)}
                    <Mega class="bg-white shadow-lg z-10 p-4 gap-4">
                        {#each items ?? [] as { label, href, src, items }, index}
                            <div
                                transition:fly={{ y: 25, duration: 250, delay: 50 * index }}
                                class="flex flex-col"
                            >
                                <slot name="image" {src} {label} {href}>
                                    <a {href} class="aspect-w-16 aspect-h-9">
                                        <img class="object-cover" alt={label} {src} />
                                    </a>
                                </slot>
                                <slot name="secondary" {label} {href} compact={false}>
                                    <a {href}>{label}</a>
                                </slot>
                                {#each items ?? [] as { label, href }}
                                    <slot name="tertiary" {label} {href} compact={false}>
                                        <a {href}>{label}</a>
                                    </slot>
                                {/each}
                            </div>
                        {/each}
                    </Mega>
                {:else}
                    <div
                        transition:fly={flyLift}
                        class="absolute top-[100%] left-0 w-auto shadow-lg flex flex-col"
                    >
                        {#each items ?? [] as { label, href, items }}
                            <Hover let:hovering class="flex flex-col relative z-10">
                                <slot name="secondary" {label} {href} compact>
                                    <a {href}>{label}</a>
                                </slot>
                                {#if hovering}
                                    <div
                                        transition:fly={{ x: 25, duration: 250 }}
                                        class="absolute top-0 left-[100%] flex flex-col shadow-xl bg-white"
                                    >
                                        {#each items ?? [] as { label, href }}
                                            <slot name="tertiary" compact {label} {href}>
                                                <a {href}>{label}</a>
                                            </slot>
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
