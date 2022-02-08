<template>
	<v-main class="main-content" :class="{'sidebar__show' : showSidebar}">
		<router-view />
	</v-main>
</template>

<script>
	export default {
		name: "Content",
		props: {
			showSidebar: {
				type: Boolean,
				default: true,
			},
		}
	}

</script>

<style lang="scss" scoped>
	.main-content {
		width: 100%;
		padding: 45px 0 0 0% !important;
		height: 100vh;
	}

	.sidebar__show {
		padding: 45px 0 0 20% !important;
	}

	@media screen and (max-width: 1292px) {
		.sidebar__show {
			padding: 45px 0 0 0% !important;
		}
	}
</style>
