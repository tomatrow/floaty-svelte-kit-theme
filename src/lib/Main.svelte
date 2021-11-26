<script lang="ts">
    import Wrapper from "$lib/_Wrapper.svelte"

    let clazz: string = undefined
    export { clazz as class }
</script>

<Wrapper>
    <main class={clazz} {...$$restProps}>
        <slot />
    </main>
</Wrapper>

<style>
    main {
        min-height: calc(100vh-var(--floaty-nav-h));
        margin-top: var(--floaty-nav-h);
    }
</style>
