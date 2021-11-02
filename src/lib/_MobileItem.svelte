<script lang="ts">
    import type { MenuItem } from "./index.type"
    import { slide, fly } from "svelte/transition"
    
    export let item: MenuItem
    export let level: number
    
    let open = false
</script>

<div href={item.href}  class="py-2">
    <div class="flex justify-between">
        <a href={item.href}>
            <slot label={item.label} />
        </a>
        {#if item.items?.length > 0}
            <button class="flex-shrink-0" on:click={() => (open = !open)}>{open ? "x" : "o" }</button>
        {/if}
    </div>
    
    {#if open}
        <div transition:slide class="flex flex-col gap-1 border-l border-black pl-4">
            {#each item.items as item, index}
                <svelte:self level={level + 1} {item} let:level let:label>
                    <slot {label} {level}  />
                </svelte:self>
            {/each}
        </div>
    {/if}
</div>