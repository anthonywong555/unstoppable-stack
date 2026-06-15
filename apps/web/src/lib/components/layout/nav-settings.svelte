<script lang="ts">
  import Settings from "@lucide/svelte/icons/settings";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>
 
<Dialog.Root>
  <Dialog.Trigger
   type="button"
  >
    <Button size="icon-sm" variant="ghost">
      <Settings />   
    </Button>
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
   <Dialog.Header>
    <Dialog.Title>Edit profile</Dialog.Title>
    <Dialog.Description>
     Make changes to your profile here. Click save when you&apos;re done.
    </Dialog.Description>
   </Dialog.Header>
   <div class="grid gap-4">
    <div class="grid gap-3">
     <Label for="name-1">Name</Label>
     <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
    </div>
    <div class="grid gap-3">
     <Label for="username-1">Username</Label>
     <Input id="username-1" name="username" defaultValue="@peduarte" />
    </div>
   </div>
   <Dialog.Footer>
    <Dialog.Close
     type="button"
     class={buttonVariants({ variant: "outline" })}
    >
     Cancel
    </Dialog.Close>
    <Button type="submit">Save changes</Button>
   </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>