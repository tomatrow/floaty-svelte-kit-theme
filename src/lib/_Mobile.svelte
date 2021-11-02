<script lang="ts">
    import type { Menu, ImageItem } from "$lib/index.type"
    import { fly } from "svelte/transition"
    import MobileItem from "./_MobileItem.svelte"
    
    export let menu: Menu
    export let open: boolean
    
    function close() {
        open = false
    }
    
    function handleClick(event) {
        if (!event.target.closest("nav"))
            close()
    }

    const duration = 200
</script>

<section transition:fly={{ x: -200, duration }} class="bg-white bg-opacity-50 hide-desktop inset-0 absolute" on:click={handleClick}>
    <nav class="bg-white overflow-y-scroll flex flex-col max-w-sm ml-auto w-full p-4">
        <button class="self-end pb-4" on:click={close}>X</button>

        <slot name="mobile-start" />

        <div class="divide-y divide-black divide-opacity-50">
            {#each menu as item, index}
                <div in:fly={{ y: -50, delay: duration + index * 25}}>
                    <MobileItem {item} />
                </div>
            {/each}
        </div>
        
        <slot name="mobile-end" />
    </nav>
</section>