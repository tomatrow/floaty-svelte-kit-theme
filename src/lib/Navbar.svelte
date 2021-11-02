<script lang="ts">
    import type { Menu } from "$lib/index.type"
    import Desktop from "./_Desktop.svelte"
    import Mobile from "./_Mobile.svelte"
    import { browser } from '$app/env'

    let clazz = ""
    export { clazz as class }
    export let menu: Menu = []    
    export let open = false
</script>

<header class="flex items-center gap-4 fixed top-0 left-0 right-0 {clazz}" {...$$restProps}>
    <slot name="bar-left" />

    <Desktop {menu}>
        <!-- todo: figure out why the primary slot does not work in the compact form -->
        <!-- <slot name="primary" {collapsed} slot="primary" let:label {label} /> -->
        <svelte:fragment slot="primary" let:label>
            <slot name="primary" {label} />
        </svelte:fragment>
        <slot name="secondary" slot="secondary" let:label {label} let:compact {compact} />
        <slot name="tertiary" slot="tertiary" let:label {label} let:compact {compact} />
    </Desktop>
    
    <slot {open} name="bar-right"  />
</header>

{#if open}
    <Mobile {menu} bind:open>
        <slot name="mobile-item" slot="mobile-item" let:level {level} let:label {label}>{label}</slot>
    </Mobile>
{/if}
