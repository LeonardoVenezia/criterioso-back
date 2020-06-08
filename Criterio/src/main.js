import App from './App.svelte';

// document.body.style.padding = '0px';

const app = new App({
	target: document.body,
	props: {
		name: 'Proyecto criteria'
	}
});

export default app;