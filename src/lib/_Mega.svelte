<script lang="ts">
    import { fly } from "svelte/transition"
    import { flyLift } from "./_common"

    let clazz = ""
    export { clazz as class }

    let x: number = 0
    let element: HTMLDivElement

    function getX() {
        return element?.getBoundingClientRect().x ?? 0
    }

    $: element && (x = getX())
</script>

<!-- this just _works_ -->
<svelte:window on:resize={() => (x += getX())} />

<div
    transition:fly={flyLift}
    bind:this={element}
    class="grid grid-cols-4 absolute {clazz}"
    style="left: -{x}px"
>
    <slot />
</div>

<style>
    div {
        width: 100vw;
        top: 100%;
    }
</style>
