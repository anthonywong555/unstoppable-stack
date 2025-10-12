<script lang="ts">
	import '@boilerplate/ui/app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from "@boilerplate/ui/sonner";
	import { ModeWatcher } from "mode-watcher";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toaster />
<ModeWatcher />

{@render children?.()}
