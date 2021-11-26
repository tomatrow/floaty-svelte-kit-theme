<script lang="ts">
    let clazz = ""
    export { clazz as class }
</script>

<header class="flex items-center fixed top-0 left-0 right-0 {clazz}">
    <slot />
</header>

<style>
    header {
        height: var(--floaty-nav-h);
    }
</style>
