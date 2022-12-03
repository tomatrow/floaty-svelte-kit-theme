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
	import { writable, type Readable } from "svelte/store"
	import type { Page } from "@sveltejs/kit"

	let navbar: HTMLHeadElement | undefined
	let clazz = ""
	export { clazz as class }
	export const open = writable(false)
	export const visible = writable(true)
	export let page: Readable<Page>

	setContext(key, {
		open,
		visible
	})

	page.subscribe(() => ($open = false))

	let hashChanged = false
	function handleHashchange() {
		hashChanged = true
	}

	let lastScroll = 0
	function handleScroll() {
		const scroll = window.pageYOffset

		if (!hashChanged) $visible = scroll < 50 || scroll < lastScroll

		lastScroll = scroll
		hashChanged = false
	}

	function handleFocus() {
		if ($open && !navbar?.contains(document.activeElement)) $open = false
	}
</script>

<svelte:window on:hashchange={handleHashchange} on:scroll={handleScroll} on:focusin={handleFocus} />

<header
	bind:this={navbar}
	class:visible={$visible || $open}
	class:open={$open}
	class="flex items-center fixed top-0 left-0 right-0 {clazz}"
>
	<slot />
</header>

<style>
	header {
		height: var(--floaty-nav-h);
		transition: transform 200ms;
	}

	header:not(.visible):not(:focus-within) {
		transform: translate(0, calc(-100% - 1rem));
	}
</style>
