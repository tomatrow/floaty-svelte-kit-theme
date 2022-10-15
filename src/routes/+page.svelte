{#each [...Array(10).keys()] as _, index}
	<div class="h-32" style:background-color={index % 2 === 0 ? "green" : "blue"}>
		{index}
	</div>
{/each}
