<script lang="ts">
	import { State, type Task } from '$lib/types/tasks';

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
</script>

<div class="h-full w-full rounded-lg bg-slate-400 p-4 shadow-lg shadow-black">
	<div class="flex flex-row justify-between">
		<h3>{props.task.title}</h3>
		<p class={getTaskStateColor(props.task.taskState) + ' text-lg font-bold'}>
			{props.task.taskState}
		</p>
	</div>
	<p class="text-base font-normal">{props.task.content}</p>
</div>
