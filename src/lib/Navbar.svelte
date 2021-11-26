<script lang="ts">
    import Wrapper from "$lib/_Wrapper.svelte"

    let clazz = ""
    export { clazz as class }
</script>

<Wrapper>
    <header class="flex items-center fixed top-0 left-0 right-0 {clazz}">
        <slot />
    </header>
</Wrapper>

<style>
    header {
        height: var(--floaty-nav-h);
    }
</style>
