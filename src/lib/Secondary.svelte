<script lang="ts">
    import type { SecondaryMenu, DynamicLinkSlot } from "./_index.type"
    import SecondaryItem from "./_SecondaryItem.svelte"
    import Wrapper from "$lib/_Wrapper.svelte"

    interface $$Slots {
        link: DynamicLinkSlot
    }

    let clazz = ""
    export { clazz as class }
    export let menu: SecondaryMenu
</script>

<span class="hide-if-mobile">
    <ul class="flex flex-wrap justify-between {clazz}">
        {#each menu as { href, label, items }}
            <li class="flex flex-col">
                <slot name="link" {href} {label} level={0} compact={false}>
                    <a {href}>{label}</a>
                </slot>
                {#if items?.length}
                    <ul class="flex flex-col">
                        {#each items as { label, href }}
                            <slot name="link" {label} {href} level={1} compact={false}>
                                <a {href}>{label}</a>
                            </slot>
                        {/each}
                    </ul>
                {/if}
            </li>
        {/each}
    </ul>
</span>

<ul class="hide-if-desktop divide-y {clazz}">
    {#each menu as item}
        <SecondaryItem
            style="border-color: var(--floaty-line-color)"
            {item}
            let:href
            let:label
            let:level
        >
            <slot name="link" {href} {label} {level} compact={true}>
                <a {href}>{label}</a>
            </slot>
        </SecondaryItem>
    {/each}
</ul>
