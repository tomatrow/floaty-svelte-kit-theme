<script lang="ts" context="module">
	import type { Writable } from "svelte/store"
	import type { InjectionKey } from "optional-default-site-kit/utility/typed-context"

	export const key: InjectionKey<{
		open: Writable<boolean>
		visible: Writable<boolean>
	}> = {}
</script>

<script lang="ts">
	import { setContext } from "optional-default-site-kit/utility/typed-context"
	import { writable } from "svelte/store"
	import { beforeNavigate } from "$app/navigation"

	export const open = writable(false)
	export const visible = writable(true)

	setContext(key, {
		open,
		visible
	})

	let clazz = ""
	export { clazz as class }

	let lastScroll = 0
	let hashChanged = false
	beforeNavigate(({ from, to }) => {
		$open = false

		if (from.url.hash !== to?.url.hash) hashChanged = true
	})

	function handleScroll() {
		const scroll = window.pageYOffset

		if (!hashChanged) $visible = scroll < 50 || scroll < lastScroll

		lastScroll = scroll
		hashChanged = false
	}
</script>

<svelte:window on:scroll={handleScroll} />

<header
	class="flex items-center fixed top-0 left-0 right-0 {clazz}"
	class:visible={$visible || $open}
>
	<slot />
</header>

<style>
	header {
		height: var(--floaty-nav-h);
		transition: transform 200ms;
	}

	header:not(.visible) {
		transform: translate(0, calc(-100% - 1rem));
	}
</style>
