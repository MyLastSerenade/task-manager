<script lang="ts">
	import type { Snippet } from 'svelte';

	let { modal = $bindable(false), children }: { modal: boolean; children: Snippet } = $props();

	function onclick() {
		modal = false;
	}
</script>

<div class="absolute left-1/2 top-1/2 z-20 h-[300px] w-[300px] bg-secondary">
	<button class="relative right-0 text-right" {onclick}>X</button>
	<div class="absoulte h-full">
		{@render children()}
	</div>
</div>
