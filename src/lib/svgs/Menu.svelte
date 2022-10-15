<script lang="ts">
	export let size = "100%"
	export let strokeWidth = 1
	export { clazz as class }
	let clazz = ""
	if (size !== "100%") {
		size =
			size.slice(-1) === "x" ? size.slice(0, size.length - 1) + "em" : parseInt(size) + "px"
	}
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	class={clazz}
	stroke-width={strokeWidth}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-linecap="round"
	stroke-linejoin="round"
>
	<line x1="3" y1="12" x2="21" y2="12" />
	<line x1="3" y1="6" x2="21" y2="6" />
	<line x1="3" y1="18" x2="21" y2="18" />
</svg>
