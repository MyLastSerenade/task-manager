import { writable } from 'svelte/store';

export type Task = {
	id: number;
	title: string;
	content: string;
	taskState: State;
};

export enum State {
	DRAFT = 'DRAFT',
	CANCELED = 'CANCELED',
	DONE = 'DONE',
	IN_PROGRESS = 'IN_PROGRESS'
}

const tasksFromStorage: string | null | undefined =
	typeof window !== 'undefined' ? localStorage.getItem('tasks') : null;

const task: Task[] = [];

const initialTasks: Task[] = tasksFromStorage ? JSON.parse(tasksFromStorage) : task;

export const tasks = writable(initialTasks);
