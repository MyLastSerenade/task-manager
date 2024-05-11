<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import TaskCard from '../components/TaskCard.svelte';
	import Modal from '../components/Modal.svelte';
	import { State, tasks, type Task } from '$lib/types/tasks';

	const drafts: Task[] = $state([]);
	const inProgress: Task[] = $state([]);
	const done: Task[] = $state([]);
	const canceled: Task[] = $state([]);

	let modal: boolean = $state(false);
	let tasksFromStore: Task[] = $state([]);
	let unsubscribe = tasks.subscribe((task) => {
		tasksFromStore = task;
	});

	onDestroy(unsubscribe);

	$inspect($tasks.length);

	onMount(() => {
		checkIfTasksInStorage();
	});

	function checkIfTasksInStorage() {
		if (tasksFromStore.length > 0) {
			tasksFromStore.forEach((element) => {
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
		} else {
			modal = true;
			return;
		}

		return;
	}
</script>

<div class="h-full w-full">
	<div class="flex h-full w-full flex-row gap-4 border-4 border-tertiary p-4
	rounded-xl">
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
		<p>tasks</p>
	</Modal>
{/if}
