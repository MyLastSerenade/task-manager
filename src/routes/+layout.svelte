<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import '../app.pcss';
	import Modal from '../components/Modal.svelte';
	import { applyAction, enhance } from '$app/forms';
	import { State, type Task } from '$lib/types/tasks';

	let modalnav: boolean = $state(false);

	let newTask: Task;

	let title: string = $state('');
	let content: string = $state('');
	let taskState: State = $state(<State>'IN_PROGRESS');

	function onclick() {
		console.log("testnav")
		modalnav = true
	}

	function addTask() {
		const tasks = localStorage.getItem('tasks');
		let taskList: Task[] = []
		const newTask = {
				title: title,
				content: content,
				taskState: taskState
			}
			taskList.push(newTask)
		if(!tasks) {
			localStorage.setItem('tasks', JSON.stringify(taskList))
		} else {
			taskList = JSON.parse(tasks)
			taskList.push(newTask)
			localStorage.setItem('tasks', JSON.stringify(taskList))
		}
	}
</script>


<nav class="bg-gray-900 py-4">
	<div class="container mx-4 flex items-center justify-between">
		<ul>
			<li>
				<button {onclick}
					class="mr-4 rounded-md bg-gray-800 px-4 py-2 text-teal-500 hover:bg-gray-700 hover:text-white"
					>Create Task</button
				>
			</li>
		</ul>
	</div>
</nav>
<slot>
</slot>

{#if modalnav}
<Modal bind:modal={modalnav}>
	<div>
		<label for="title">Titel: </label>
		<input bind:value={title} name="title" id="title" type="text"/>
		<label for="content">Content: </label>
		<input bind:value={content} name="content" id="content" type="text"/>
		<label for="state">State: </label>
		<select bind:value={taskState} name="state" id="state">
			<option value="IN_PROGRESS">In Progress</option>
			<option value="CANCELED">Canceled</option>
			<option value="DONE">Done</option>
			<option value="DRAFT">Draft</option>
		</select>
		<button onclick={addTask}>Add Task</button>
	</div>
</Modal>
{/if}
