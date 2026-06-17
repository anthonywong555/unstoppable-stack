<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from "$lib/components/ui/sonner/index.js";
	import { ModeWatcher } from "mode-watcher";
	import type { LayoutProps } from './$types';
	import AppSidebar from "$lib/components/layout/app-sidebar.svelte";
	import Settings from "$lib/components/settings/nav-settings.svelte";
	import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toaster />
<ModeWatcher />

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		<header class="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
      <Sidebar.Trigger class="-ms-1" />
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Page>Data Fetching</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
			<Settings />
    </header>
		<div class="flex flex-1 flex-col gap-4 p-4">
      {#each Array.from({ length: 24 }) as _, index (index)}
        <div class="bg-muted/50 aspect-video h-12 w-full rounded-lg"></div>
      {/each}
    </div>
	</Sidebar.Inset>
</Sidebar.Provider>