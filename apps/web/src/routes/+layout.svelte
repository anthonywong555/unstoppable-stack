<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from "$lib/components/ui/sonner/index.js";
	import { ModeWatcher } from "mode-watcher";
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();

	const healthCheck = fetch('/api/durable-execution').then(res => res.json());
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toaster />
<ModeWatcher />
{@render children()}



{#await healthCheck}
  <p>Checking Temporal...</p>
{:then data}
  {#if data}
    <p>✅ Temporal is online</p>
  {:else}
    <p>❌ Temporal is offline}</p>
  {/if}
{:catch err}
  <p>❌ Failed to reach health endpoint</p>
{/await}