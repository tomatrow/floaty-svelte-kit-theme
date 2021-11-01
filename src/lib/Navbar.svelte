<script lang="ts">
    import type { Menu } from "$lib/index.type"
    import Hover from "$lib/Hover.svelte"
    import { fly } from "svelte/transition"

    let clazz = ""
    export { clazz as class }
    export let menu: Menu = []    
    
    export let collapsed: boolean = undefined
</script>

<header class="flex items-center gap-4 fixed top-0 left-0 right-0 {clazz}" {...$$restProps}>
    <slot name="before" {collapsed} />
    <nav class="flex gap-4 flex-wrap">
        {#each menu as { label, href, items }}
            <Hover class="{items?.every(item => !item.src) ? 'relative': ''} overflow-visible flex justify-center items-center" let:hovering>
                <a {href} class="px-4 py-2">
                    <slot name="primary" {label} {collapsed}>{label}</slot>
                </a>
                {#if hovering}
                    {#if items?.every(item => item.src)}
                        <div transition:fly={{ y: 25, duration: 250 }} class="bg-red-500 w-screen">
                            HEEELLLO
                        </div>
                    {:else}
                        <div transition:fly={{ y: 25, duration: 250 }} class="absolute top-[100%] left-0 w-auto shadow-lg flex flex-col">
                            {#each (items ?? []) as { label, href, items }}
                                <Hover let:hovering class="flex flex-col relative">
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
