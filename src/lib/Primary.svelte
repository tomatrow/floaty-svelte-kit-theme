<script lang="ts">
    import type { PrimaryMenu, ImageItem, DynamicLinkSlot, ImageLinkSlot } from "$lib/_index.type"
    import { Hover } from "optional-default-site-kit/components"
    import { fly } from "svelte/transition"
    import Mega from "$lib/_Mega.svelte"
    import { flyLift } from "$lib/_common"
    import { preloadImage } from "optional-default-site-kit/functions/preloadImage"
    import { onMount } from "svelte"

    interface $$Slots {
        link: DynamicLinkSlot
        image: ImageLinkSlot
    }

    export let megaClass = ""
    export let menu: PrimaryMenu
    let clazz = ""
    export { clazz as class }

    let enabled = true

    function isMega(items?: ImageItem[]) {
        return items?.every(item => item.src)
    }

    onMount(() => {
        menu.flatMap(item => item.items?.map(item => item.src) ?? [])
            .filter(Boolean)
            .map(preloadImage)
    })
</script>

<svelte:window on:sveltekit:navigation-start={() => (enabled = false)} />

<div class="hide-if-mobile">
    <nav class="flex flex-wrap  {clazz}" on:pointerenter={() => (enabled = true)}>
        {#each menu ?? [] as { label, href, items }}
            <Hover
                leaveDelay={400}
                let:hovering
                class="relative overflow-visible flex justify-center items-center"
            >
                <slot name="link" {label} {href} compact={false} level={0}>
                    <a {href}>{label}</a>
                </slot>
                {#if hovering && enabled}
                    {#if isMega(items)}
                        <Mega class="z-10 {megaClass}">
                            {#each items ?? [] as { label, href, src, items }, index}
                                <div
                                    transition:fly={{ y: 25, duration: 250, delay: 50 * index }}
                                    class="flex flex-col"
                                >
                                    <slot name="image" {src} {label} {href} level={1}>
                                        <a {href} class="aspect-w-16 aspect-h-9">
                                            <img class="object-cover" alt={label} {src} />
                                        </a>
                                    </slot>
                                    <slot name="link" {label} {href} compact={false} level={1}>
                                        <a {href}>{label}</a>
                                    </slot>
                                    {#each items ?? [] as { label, href }}
                                        <slot name="link" {label} {href} compact={false} level={2}>
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
                                    <slot name="link" {label} {href} compact={true} level={1}>
                                        <a {href}>{label}</a>
                                    </slot>
                                    {#if hovering && enabled}
                                        <div
                                            transition:fly={{ x: 25, duration: 250 }}
                                            class="absolute top-0 left-[100%] flex flex-col shadow-xl bg-white"
                                        >
                                            {#each items ?? [] as { label, href }}
                                                <slot
                                                    name="link"
                                                    {label}
                                                    {href}
                                                    compact={true}
                                                    level={2}
                                                >
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
</div>
