<script lang="ts" context="module">
    import menu from "./_menu.json"
</script>

<script lang="ts">
    import "../app.css"
    import { Main, Primary, PrimaryCompact, Secondary, Navbar} from "$lib"
    import { Menu, Cross } from "$lib/svgs"
    import { merge } from "$lib/_common"

    let open: boolean
</script>

<Navbar
    class="bg-red-500 gap-4 p-4"
>
    <a href="/" class="p-4">LOGO</a>

    <Primary class="mx-auto gap-4" {menu} megaClass="bg-blue-500 gap-4 p-4">
        <svelte:fragment slot="link" let:href let:label let:level let:compact>
            <a {href} class={merge(
                "bg-green-500",
                level === 0 && "p-4",
                level === 1 && (compact ? 'p-4 duration-200 hover:bg-gray-100 whitespace-nowrap' : 'font-black'),
                level === 2 && compact && "hover:bg-gray-100 duration-200 p-4 whitespace-nowrap"
            )}>{label}!</a>
        </svelte:fragment>
    </Primary>

    <button class="hide-if-desktop ml-auto" type="button" on:click={() => (open = !open)}>
        <Menu class="w-8 h-8" />
    </button>
</Navbar>

<Main>
    <slot />
    <footer class="bg-red-600 text-white mt-auto flex flex-col gap-4 sm:gap-8 p-4 sm:flex-row items-center">
        <a href="/" class="p-8">LOGO</a>
        <Secondary {menu} class="self-stretch sm:mx-auto sm:max-w-lg sm:w-full">
            <svelte:fragment slot="link" let:href let:label let:level let:compact>
                <a {href} class={merge(
                    compact && (level === 0 ? "py-2" : "block p-1"),
                    !compact && (level === 0 ? "font-bold p-2" : "px-2 py-1")
                )}>{level}-{label}!</a>
            </svelte:fragment>
        </Secondary>
        <span class="whitespace-pre">
            {@html "This is a spot\nfor some address\ninfo type stuff."}
        </span>
    </footer>
</Main>

{#if open}
    <PrimaryCompact {menu} bind:open class="text-red-700 bg-green-300 p-4" rootClass="bg-white bg-opacity-80 z-10">
        <svelte:fragment slot="link" let:level let:label let:href>
            <a {href} class="hover:underline">{level}-{label}!</a>
        </svelte:fragment>
    </PrimaryCompact>
{/if}

<style global lang="postcss">
    :root {
        --floaty-nav-h: 5rem;
        --floaty-control-color: black;
        --floaty-line-color: blue;
    }

    .hide-if-mobile {
        display: none;
    }

    @screen sm {
        .hide-if-desktop {
            display: none;
        }
        .hide-if-mobile {
            display: contents;
        }
    }
</style>
