<script lang="ts">
    import type { Menu } from "$lib/_index.type"
    import { fly } from "svelte/transition"
    import MobileItem from "./_MobileItem.svelte"

    interface $$Slots {
        close: {
            close: () => void
        }
        link: {
            level: number
            label: string
            href: string
        }
    }

    export let menu: Menu
    export let open: boolean

    let clazz = ""
    export { clazz as class }

    function close() {
        open = false
    }

    function handlePointerDown(event: PointerEvent) {
        const target = event.target as HTMLElement
        const inside = !!(target.nodeName === "NAV" || target.closest("nav"))
        if (!inside) close()
    }

    const duration = 200
</script>

<section
    transition:fly={{ x: 100, duration }}
    class="inset-0 absolute {clazz}"
    on:pointerdown={handlePointerDown}
>
    <nav class="bg-white overflow-y-scroll flex flex-col max-w-sm ml-auto w-full p-4">
        <slot name="close" {close}>
            <button type="button" class="self-end pb-4" on:pointerdown={close}> ╳ </button>
        </slot>

        <slot name="before" />

        <div class="divide-y divide-black divide-opacity-50">
            {#each menu as item, index}
                <div in:fly={{ y: -50, delay: duration + index * 25 }}>
                    <MobileItem {item} let:href let:label let:level level={0}>
                        <slot name="link" {level} {label} {href} />
                    </MobileItem>
                </div>
            {/each}
        </div>

        <slot name="after" />
    </nav>
</section>
