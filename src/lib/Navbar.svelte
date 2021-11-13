<script lang="ts">
    let clazz = ""
    export { clazz as class }
</script>

<header class="flex items-center fixed top-0 left-0 right-0 h-[var(--floaty-nav-h)] {clazz}">
    <slot />
</header>
