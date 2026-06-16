<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import type { Component, ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		...restProps
	}: {
		items: {
			title: string;
			url: string;
			icon: Component;
		}[];
	} & ComponentProps<typeof Sidebar.Group> = $props();

  import SunIcon from "@lucide/svelte/icons/sun";
  import MoonIcon from "@lucide/svelte/icons/moon";
 
  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Sidebar.Group bind:ref {...restProps}>
	<Sidebar.GroupContent>
		<Sidebar.Menu>
				<Sidebar.MenuItem>
          <Sidebar.MenuButton class="dark:hidden" onclick={toggleMode}>
            <SunIcon /> Day
          </Sidebar.MenuButton>
          <Sidebar.MenuButton class="hidden dark:flex" onclick={toggleMode}>
            <MoonIcon /> Night
          </Sidebar.MenuButton>
				</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.GroupContent>
</Sidebar.Group>
