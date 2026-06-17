<script lang="ts">
  import Settings from "@lucide/svelte/icons/settings";
  import { Spinner } from "$lib/components/ui/spinner/index.js";
  import { MediaQuery } from "svelte/reactivity";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import { getStatus } from '../../../routes/durable-execution/data.remote';

	const query = getStatus();
  
  let open = $state(false);
  const isDesktop = new MediaQuery("(min-width: 768px)");

  const id = $props.id();
</script>

{#if isDesktop.current}
 <Dialog.Root bind:open>
  <Dialog.Trigger class={buttonVariants({ variant: 'ghost', size: 'icon-sm'})}>
    <Settings />
  </Dialog.Trigger
  >
  <Dialog.Content class="sm:max-w-[425px]">
   <Dialog.Header>
    <Dialog.Title>Settings</Dialog.Title>
    <Dialog.Description>Show status of your connected services.</Dialog.Description>
   </Dialog.Header>
    <Table.Root>
    <Table.Caption></Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head>Services</Table.Head>
        <Table.Head>Status</Table.Head>
        <Table.Head>Actions</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell class="font-medium">Durable Execution</Table.Cell>
        <Table.Cell>
          {#if query.error}
            <Badge variant="destructive">Offline</Badge>
          {:else if query.loading}
            <Badge><Spinner />Loading</Badge>
          {:else if query.current == true}
            <Badge variant="secondary" class="bg-green-500">Online</Badge>
          {:else}
            <Badge variant="destructive">Offline</Badge>
          {/if}
        </Table.Cell>
        <Table.Cell>
          <Button variant="outline">Dashboard</Button>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-medium">Sync Engine</Table.Cell>
        <Table.Cell>
          <Badge variant="destructive">Offline</Badge>
        </Table.Cell>
        <Table.Cell>
        </Table.Cell>
      </Table.Row>
            <Table.Row>
        <Table.Cell class="font-medium">Database</Table.Cell>
        <Table.Cell>
          <Badge variant="secondary" class="bg-green-500">Online</Badge>
        </Table.Cell>
        <Table.Cell>
          <Button variant="destructive">Reset</Button>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
    </Table.Root>
  </Dialog.Content>
 </Dialog.Root>
{:else}
 <Drawer.Root bind:open>
  <Drawer.Trigger class={buttonVariants({ variant: 'ghost', size: 'icon-sm'})}><Settings />
  </Drawer.Trigger>
  <Drawer.Content>
   <Drawer.Header class="text-start">
    <Drawer.Title>Settings</Drawer.Title>
    <Drawer.Description>Show status of your connected services.</Drawer.Description>
   </Drawer.Header>
    <Table.Root>
    <Table.Caption></Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head>Services</Table.Head>
        <Table.Head>Status</Table.Head>
        <Table.Head>Actions</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell class="font-medium">Durable Execution</Table.Cell>
        <Table.Cell>
          {#if query.error}
            <Badge variant="destructive">Offline</Badge>
          {:else if query.loading}
            <Badge><Spinner />Loading</Badge>
          {:else if query.current == true}
            <Badge variant="secondary" class="bg-green-500">Online</Badge>
          {:else}
            <Badge variant="destructive">Offline</Badge>
          {/if}
        </Table.Cell>
        <Table.Cell>
          <Button variant="outline">Dashboard</Button>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-medium">Sync Engine</Table.Cell>
        <Table.Cell>
          <Badge variant="destructive">Offline</Badge>
        </Table.Cell>
        <Table.Cell>
        </Table.Cell>
      </Table.Row>
            <Table.Row>
        <Table.Cell class="font-medium">Database</Table.Cell>
        <Table.Cell>
          <Badge variant="secondary" class="bg-green-500">Online</Badge>
        </Table.Cell>
        <Table.Cell>
          <Button variant="destructive">Reset</Button>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
    </Table.Root>
  </Drawer.Content>
 </Drawer.Root>
{/if}