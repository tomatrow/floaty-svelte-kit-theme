<script lang="ts">
	export let size = "100%"
	export let strokeWidth = 1
	export let fill = "none"
	export { clazz as class }
	let clazz: string = undefined
	if (size !== "100%") {
		size =
			size.slice(-1) === "x" ? size.slice(0, size.length - 1) + "em" : parseInt(size) + "px"
	}
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	{fill}
	class={clazz}
	stroke-width={strokeWidth}
	viewBox="0 0 24 24"
	stroke="currentColor"
	stroke-linecap="round"
	stroke-linejoin="round"
	><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg
>
