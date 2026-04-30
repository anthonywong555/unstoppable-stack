<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from "$lib/components/ui/sonner/index.js";
	import { ModeWatcher } from "mode-watcher";
	import type { LayoutProps } from './$types';
	import { getStatus } from '../routes/durable-execution/data.remote';

	let { children }: LayoutProps = $props();

	const query = getStatus();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toaster />
<ModeWatcher />
{@render children()}


{#if query.error}
	<p>oops!</p>
{:else if query.loading}
	<p>loading...</p>
{:else}
	{#if query.current === true}
	<h1>Ablet to connect to Temporal</h1>
	{:else}
	<h1>Not able to connect Temporal</h1>
	{/if}
{/if}
