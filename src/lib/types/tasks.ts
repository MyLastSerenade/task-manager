export type Task = {
	title: string;
	content: string;
	state: State;
	creation_date: string;
	change_date: string;
};

export enum State {
	DRAFT = 'DRAFT',
	CANCELED = 'CANCELED',
	DONE = 'DONE',
	IN_PROGRESS = 'IN_PROGRESS'
}
