<script lang="ts">
    let clazz = ""
    export { clazz as class }
</script>

<main
    class="flex flex-col min-h-[calc(100vh-var(--floaty-nav-h))] mt-[var(--floaty-nav-h)] {clazz}"
>
    <slot />
</main>
