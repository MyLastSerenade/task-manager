<script lang="ts">
	import type { Snippet } from 'svelte';

	let { modal = $bindable(false), children }: { modal: boolean; children: Snippet } = $props();

	function onclick() {
		modal = false;
	}
</script>

<div class="absolute left-1/2 top-1/2 z-20 h-[300px] w-[300px] bg-gray-500">
	<button class="w-full text-right" {onclick}>X</button>
	<div>
		{@render children()}
	</div>
</div>
