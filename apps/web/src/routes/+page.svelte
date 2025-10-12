<script lang="ts">
	import { Button } from '@boilerplate/ui/button';
	import { PersistedState } from "runed";
 
	const count = new PersistedState("count", 0);

</script>

<div>
	<h1>PersistedState</h1>
	<Button onclick={() => count.current++}>Increment</Button>
	<Button onclick={() => count.current--}>Decrement</Button>
	<Button onclick={() => (count.current = 0)}>Reset</Button>
	<p>Count: {count.current}</p>
</div>