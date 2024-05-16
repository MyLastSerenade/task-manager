<script lang="ts">
	import { State, tasks, type Task } from '$lib/types/tasks';
	import Icon from './Icon.svelte';

	let { ...props }: { task: Task } = $props();

	function getTaskStateColor(taskState: State): string {
		switch (taskState) {
			case State.DRAFT:
				return 'text-gray-900';
			case State.CANCELED:
				return 'text-red-900';
			case State.DONE:
				return 'text-green-900';
			case State.IN_PROGRESS:
				return 'text-blue-900';
		}
	}

	function deleteTask(id: number) {
		let tasklist: Task[] = [];
		tasks.subscribe((tasks) => {
			tasklist = tasks;
		});
		let task = tasklist.find((task) => task.id == id) as Task;
		if (task) {
			tasklist.splice(tasklist.indexOf(task), tasklist.indexOf(task) + 1);
			console.log(tasklist);
		}
		localStorage.setItem('tasks', JSON.stringify(tasklist));
	}
</script>

<div class="shadow-black w-full rounded-lg bg-secondary p-4 shadow-lg">
	<div class="flex flex-row justify-between">
		<h3>{props.task.title}</h3>
		<p class={getTaskStateColor(props.task.taskState) + ' text-lg font-bold'}>
			{props.task.taskState}
		</p>
		<Icon on:click={() => deleteTask(props.task.id)}>delete</Icon>
	</div>
	<p class="text-base font-normal">{props.task.content}</p>
</div>
