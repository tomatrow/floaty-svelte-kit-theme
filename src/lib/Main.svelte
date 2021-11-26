<script lang="ts">
    let clazz = ""
    export { clazz as class }
</script>

<main
    class="min-h-[calc(100vh-var(--floaty-nav-h))] mt-[var(--floaty-nav-h)] {clazz}"
    {...$$restProps}
>
    <slot />
</main>
