<script lang="ts">
    let clazz: string = undefined
    export { clazz as class }
</script>

<main class={clazz} {...$$restProps}>
    <slot />
</main>

<style>
    main {
        min-height: calc(100vh-var(--floaty-nav-h));
        margin-top: var(--floaty-nav-h);
    }
</style>
