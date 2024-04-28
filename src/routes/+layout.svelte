<script lang="ts">
	import '../app.pcss';
	import Modal from '../components/Modal.svelte';
	import { State, type Task } from '$lib/types/tasks';

	let modalnav: boolean = $state(false);


	let title: string = $state('');
	let content: string = $state('');
	let taskState: State = $state(<State>'IN_PROGRESS');

	function onclick() {
		console.log('testnav');
		modalnav = true;
	}

	function addTask() {
		const tasks = $state(localStorage.getItem('tasks'));
		let taskList: Task[] = [];
		const newTask = {
			title: title,
			content: content,
			taskState: taskState
		};
		taskList.push(newTask);
		if (!tasks) {
			localStorage.setItem('tasks', JSON.stringify(taskList));
		} else {
			taskList = JSON.parse(tasks);
			taskList.push(newTask);
			localStorage.setItem('tasks', JSON.stringify(taskList));
		}
		modalnav = false;
	}
</script>

<nav class="bg-gray-900 py-4 w-full overflow-hidden">
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
<slot />

{#if modalnav}
	<Modal bind:modal={modalnav}>
		<div class="relative h-full flex flex-col justify-between">
			<div class="flex flex-col p-1 gap-2">
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
				<button class="border-2 bg-slate-300 w-1/2 h-12" onclick={addTask}>Add Task</button>
			</div>
		</div>
	</Modal>
{/if}
