<script lang="ts">
    import { fly } from "svelte/transition"
    import { flyLift } from "./_common"

    let clazz = ""
    export { clazz as class }
    let element: HTMLDivElement
    $: bounds = element?.getBoundingClientRect()
</script>

<div
    transition:fly={flyLift}
    bind:this={element}
    class="grid grid-cols-4 absolute w-[100vw] top-[100%] {clazz}"
    style="left: -{bounds?.x ?? 0}px"
>
    <slot />
</div>
