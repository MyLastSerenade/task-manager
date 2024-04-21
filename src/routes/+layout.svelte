<script>
	import '../app.pcss';
</script>

<nav class="bg-gray-900 py-4">
	<div class="container mx-4 flex items-center justify-between">
		<ul>
			<li>
				<button
					class="mr-4 rounded-md bg-gray-800 px-4 py-2 text-teal-500 hover:bg-gray-700 hover:text-white"
					>Create Task</button
				>
			</li>
		</ul>
	</div>
</nav>
<slot></slot>
