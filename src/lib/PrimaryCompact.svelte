<script lang="ts">
	import type { PrimaryMenu, LinkSlot } from "$lib/_index.type"
	import type { Page } from "@sveltejs/kit"
	import type { Readable } from "svelte/store"
	import { fly } from "svelte/transition"
	import MobileItem from "./_MobileItem.svelte"

	interface $$Slots {
		link: LinkSlot
	}

	export let menu: PrimaryMenu
	export let open: boolean
	export let page: Readable<Page>

	let clazz = ""
	export { clazz as class }
	export let rootClass = ""

	function close() {
		open = false
	}

	function handlePointerDown(event: PointerEvent) {
		const target = event.target as HTMLElement
		const inside = !!(target.nodeName === "NAV" || target.closest("nav"))
		if (!inside) close()
	}

	const duration = 200
	const browser = typeof window !== "undefined"

	$: browser && document.body.classList[open ? "add" : "remove"]("lock-scroll")

	let pathname = browser ? window.location.toString() : undefined
	page.subscribe($page => {
		if (pathname === $page.url.toString()) return
		pathname = $page.url.pathname
		close()
	})
</script>

<section
	transition:fly={{ x: 100, duration }}
	class="hide-if-desktop fixed inset-0 overflow-scroll {rootClass}"
	on:pointerdown={handlePointerDown}
>
	<nav class="overflow-y-scroll flex flex-col max-w-sm ml-auto w-full {clazz}">
		<button
			style="color: var(--floaty-control-color)"
			type="button"
			class="self-end pb-4"
			on:pointerdown={close}
		>
			╳
		</button>

		<slot name="before" />

		<div class="divide-y">
			{#each menu as item, index}
				<div
					style="border-color: var(--floaty-line-color)"
					in:fly={{ y: -50, delay: duration + index * 25 }}
				>
					<MobileItem {item} let:href let:label let:level level={0}>
						<slot name="link" {level} {label} {href}>
							<a {href}>{label}</a>
						</slot>
					</MobileItem>
				</div>
			{/each}
		</div>

		<slot name="after" />
	</nav>
</section>

<style global lang="postcss">
	body.lock-scroll {
		overflow: hidden;
	}
</style>
