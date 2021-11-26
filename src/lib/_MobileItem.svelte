<script lang="ts">
    import type { Item, LinkSlot } from "./_index.type"
    import { slide } from "svelte/transition"
    import { ChevronDown } from "$lib/svgs"

    interface $$Slots {
        default: LinkSlot
    }

    export let item: Item
    export let level: number

    let open = false
</script>

<div class="py-2">
    <div class="flex justify-between">
        <slot href={item.href} label={item.label} {level} />
        {#if item.items?.length > 0}
            <button
                style="color: var(--floaty-control-color)"
                class="ml-auto flex-shrink-1"
                on:click={() => (open = !open)}
            >
                <ChevronDown class="w-8 duration-[225ms] {open ? 'scale-y-[-1]' : ''}" />
            </button>
        {/if}
    </div>

    {#if open}
        <div
            transition:slide
            class="flex flex-col border-l pl-4"
            style="border-color: var(--floaty-line-color)"
        >
            {#each item.items as item}
                <svelte:self level={level + 1} {item} let:level let:label let:href>
                    <slot {level} {label} {href} />
                </svelte:self>
            {/each}
        </div>
    {/if}
</div>
