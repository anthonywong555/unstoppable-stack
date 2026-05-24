<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from "$lib/components/ui/sonner/index.js";
	import { ModeWatcher } from "mode-watcher";
	import type { LayoutProps } from './$types';
	import { getStatus } from '../routes/durable-execution/data.remote';
	import AppSidebar from "$lib/components/layout/app-sidebar.svelte";
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
		<header class="flex items-center h-16 shrink-0 gap-2 px-4 justify-between">
				<Sidebar.Trigger class="-ms-1" />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						<Breadcrumb.Item class="hidden md:block">
							<Breadcrumb.Link href="##">Build Your Application</Breadcrumb.Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator class="hidden md:block" />
						<Breadcrumb.Item>
							<Breadcrumb.Page>Data Fetching</Breadcrumb.Page>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>
				<Sidebar.Trigger class="-ms-1" />
			</header>
		<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
			{@render children()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>