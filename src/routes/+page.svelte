<script lang="ts">
	import TaskCard from '../components/TaskCard.svelte';

	const tasks: string[] = ['task', 'task', 'task', 'task'];
</script>

<div class="m-4 flex flex-row gap-4">
	{#each tasks as task, index}
		<TaskCard>
			<p>{task} - {index}</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quae harum itaque suscipit
				numquam. Aspernatur, similique explicabo. Ipsum doloribus autem nesciunt repellat eum fuga,
				dolore deserunt, illo vitae quam omnis!
			</p>
		</TaskCard>
	{/each}
</div>
