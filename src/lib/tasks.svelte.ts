import type { Task } from './types/tasks';

export class getTasks {
	tasks: Task[] = $state([]);

	constructor(initial: Task[]) {
		this.tasks = initial;
	}
}
