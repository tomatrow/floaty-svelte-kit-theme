<script lang="ts">
    import type { Item, MobileLinkSlot } from "./_index.type"
    import { slide } from "svelte/transition"
    import { ChevronDown } from "$lib/svgs"

    interface $$Slots {
        default: MobileLinkSlot
    }

    export let item: Item
    export let level: number

    let open = false
</script>

<div href={item.href} class="py-2">
    <div class="flex justify-between items-center">
        <a href={item.href}>
            <slot label={item.label} />
        </a>
        {#if item.items?.length > 0}
            <button class="flex-shrink-0 rounded-full bg-black" on:click={() => (open = !open)}>
                <ChevronDown
                    class="text-white h-8 w-8 duration-[225ms] {open ? 'scale-y-[-1]' : ''}"
                />
            </button>
        {/if}
    </div>

    {#if open}
        <div transition:slide class="flex flex-col gap-1 border-l border-black pl-4">
            {#each item.items as item}
                <svelte:self level={level + 1} {item} let:level let:label let:item>
                    <slot {level} {label} href={item?.href} />
                </svelte:self>
            {/each}
        </div>
    {/if}
</div>
