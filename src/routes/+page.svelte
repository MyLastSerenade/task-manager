<script lang="ts">
	import { onMount } from 'svelte';
	import TaskCard from '../components/TaskCard.svelte';
    import Modal from '../components/Modal.svelte';
	import type { Task } from '$lib/types/tasks';

	const tasks: string[] = ['task', 'task', 'task', 'task'];

    let tasksFromStorage: Task[] = [];
    let modal:boolean = false;

    onMount(() => {
        checkIfTasksInStorage()
    })

    function checkIfTasksInStorage() {
        const tasks = localStorage.getItem("tasks");
        if(!tasks) {
            modal = true;
            return;
        }
        tasksFromStorage = JSON.parse(tasks);
    }

</script>
<div class="relative h-full w-full">
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
{#if modal}
<Modal>
    <p>test</p>
</Modal bind:modal>
{/if}
</div>