<script lang="ts">
	import '../app.pcss';
	import Modal from '../components/Modal.svelte';
	import { State, type Task } from '$lib/types/tasks';

	let { children } = $props();
	let modalnav: boolean = $state(false);

	let tasks: Task[] = $state([]);
	let title: string = $state('');
	let content: string = $state('');
	let taskState: State = $state(<State>'IN_PROGRESS');
	function onclick() {
		modalnav = true;
	}

	function addTask() {
		const newTask = {
			title: title,
			content: content,
			taskState: taskState
		};
		const tasksListOne = localStorage.getItem('tasks');
		console.log(tasksListOne);
		if (tasksListOne) {
			tasks = JSON.parse(tasksListOne);
			console.log('tasks', tasks);
			tasks.push(newTask);
			localStorage.setItem('tasks', JSON.stringify(tasks));
		} else {
			tasks.push(newTask);
			localStorage.setItem('tasks', JSON.stringify(tasks));
		}
		title = '';
		content = '';
		taskState = State.DRAFT;
		modalnav = false;
	}
</script>

<nav class="w-full overflow-hidden bg-gray-900 py-4">
	<div class="container flex items-center justify-between">
		<ul>
			<li>
				<button
					{onclick}
					class="mr-4 rounded-md bg-gray-800 px-4 py-2 text-teal-500 hover:bg-gray-700 hover:text-white"
					>Create Task</button
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
				<button class="h-12 w-1/2 border-2 bg-slate-300" onclick={addTask}>Add Task</button>
			</div>
		</div>
	</Modal>
{/if}
