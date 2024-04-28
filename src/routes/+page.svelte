<script lang="ts">
	import { onMount } from 'svelte';
	import TaskCard from '../components/TaskCard.svelte';
	import Modal from '../components/Modal.svelte';
	import { State, type Task } from '$lib/types/tasks';

	let allTasks: Task[] = $state([]);
	const drafts: Task[] = $state([]);
	const inProgress: Task[] = $state([]);
	const done: Task[] = $state([]);
	const canceled: Task[] = $state([]);

	let modal: boolean = false;

	onMount(() => {
		checkIfTasksInStorage();
	});

	function checkIfTasksInStorage() {
		allTasks = JSON.parse(localStorage.getItem('tasks') ?? '');
		console.log(allTasks);
		if (allTasks) {
			allTasks.forEach((element) => {
				if (element.taskState === State.DRAFT) {
					drafts.push(element);
					return;
				}
				if (element.taskState === State.IN_PROGRESS) {
					inProgress.push(element);
					return;
				}
				if (element.taskState === State.DONE) {
					done.push(element);
					return;
				}
				if (element.taskState === State.CANCELED) {
					canceled.push(element);
					return;
				}
			});
		}
		modal = true;
		return;
	}
</script>

<div class="h-full w-full">
	<div class="flex h-full w-full flex-row gap-4 border-4 border-purple-900 p-4">
		<div class="flex w-1/4 flex-col gap-4">
			<h2>Drafts</h2>
			{#if drafts}
				{#each drafts as task, index}
					<TaskCard {task} />
				{/each}
			{:else}
				<p>No Draft Tasks available</p>
			{/if}
		</div>
		<div class="flex w-1/4 flex-col gap-4">
			<h2>In Progress</h2>
			{#if inProgress}
				{#each inProgress as task, index}
					<TaskCard {task} />
				{/each}
			{:else}
				<p>No in Progress Tasks available</p>
			{/if}
		</div>
		<div class="flex w-1/4 flex-col gap-4">
			<h2>Done</h2>
			{#if done}
				{#each done as task, index}
					<TaskCard {task} />
				{/each}
			{:else}
				<p>No Done Tasks available</p>
			{/if}
		</div>
		<div class="flex w-1/4 flex-col gap-4">
			<h2>Canceled</h2>
			{#if canceled}
				{#each canceled as task, index}
					<TaskCard {task} />
				{/each}
			{:else}
				<p>No Canceled Tasks available</p>
			{/if}
		</div>
	</div>
</div>

{#if modal}
	<Modal bind:modal>
		<p>test</p>
	</Modal>
{/if}
