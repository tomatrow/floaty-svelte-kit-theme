<script lang="ts">
	import type { LinkSlot, SecondaryMenu } from "./_index.type"
	import { slide, fly } from "svelte/transition"
	import { ChevronDown } from "$lib/svgs"

	interface $$Slots {
		default: LinkSlot
	}

	let clazz: string = undefined
	export { clazz as class }
	export let item: SecondaryMenu[0]
	export let style: string = undefined

	let open = false
</script>

<li class={clazz} {style}>
	<div class="flex justify-between items-center">
		<slot href={item.href} label={item.label} level={0} />
		{#if item.items?.length > 0}
			<button
				style="color: var(--floaty-control-color)"
				class="flex-shrink-0"
				on:click={() => (open = !open)}
			>
				<ChevronDown
					style={open ? "transfrom: scaleY(-1)" : ""}
					class="h-6 w-6 duration-200"
				/>
			</button>
		{/if}
	</div>

	{#if open}
		<ul transition:slide class="">
			{#each item.items as { label, href }, index}
				<li transition:fly={{ y: 10, duration: 200, delay: index * 25 }}>
					<slot {href} {label} level={1} />
				</li>
			{/each}
		</ul>
	{/if}
</li>
