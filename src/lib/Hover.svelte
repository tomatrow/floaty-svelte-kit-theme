<script lang="ts">
    export let hovering = false
</script>

<div
    {...$$restProps}
    on:mouseenter={() => (hovering = true)}
    on:mouseleave={() => (hovering = false)}
>
    <slot {hovering} />
</div>
