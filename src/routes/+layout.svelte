<script lang="ts">
	import '../app.pcss';
	import '../styles/general.scss';
	import Modal from '../components/Modal.svelte';
	import { State, tasks, type Task } from '$lib/types/tasks';

	let { children } = $props();
	let modalnav: boolean = $state(false);

	let title: string = $state('');
	let content: string = $state('');
	let taskState: State = $state(<State>'IN_PROGRESS');

	function onclick() {
		modalnav = true;
	}

	function addTask() {
		const newTask = {
			id:
				$tasks.length > 0
					? $tasks.map((task) => {
							return Math.max(task.id);
						})[0] + 1
					: 1,
			title: title,
			content: content,
			taskState: taskState
		};
		$tasks.push(newTask);
		tasks.update((task) => ($tasks = task));
		localStorage.setItem('tasks', JSON.stringify($tasks));
		title = '';
		content = '';
		taskState = State.DRAFT;
		modalnav = false;
	}
</script>

<nav class="bg-gray-900 w-full overflow-hidden p-4">
	<div class="container flex items-center justify-between">
		<ul>
			<li>
				<button
					{onclick}
					class="bg-gray-800 hover:text-white mr-4 rounded-md bg-secondary
					px-4
					py-2 hover:opacity-[.5]">Create Task</button
				>
			</li>
		</ul>
	</div>
</nav>
{@render children()}

{#if modalnav}
	<Modal bind:modal={modalnav}>
		<div class="relative flex h-full flex-col justify-between">
			<div class="flex flex-col gap-2 p-1">
				<label for="title">Titel: </label>
				<input bind:value={title} name="title" id="title" type="text" />
				<label for="content">Content: </label>
				<input bind:value={content} name="content" id="content" type="text" />
				<label for="state">State: </label>
				<select bind:value={taskState} name="state" id="state">
					<option value="IN_PROGRESS">In Progress</option>
					<option value="CANCELED">Canceled</option>
					<option value="DONE">Done</option>
					<option value="DRAFT">Draft</option>
				</select>
			</div>
			<div class="flex flex-row justify-center pb-2">
				<button class="bg-slate-300 h-12 w-1/2 border-2" onclick={addTask}>Add Task</button>
			</div>
		</div>
	</Modal>
{/if}

<style>
	select,
	input {
		color: black;
	}
</style>
