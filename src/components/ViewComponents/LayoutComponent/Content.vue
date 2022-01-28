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
		margin: 45px 0 0 0 !important;
	}

	.sidebar__show {
		margin: 45px 0 0 20% !important;
	}

	@media screen and (max-width: 1292px) {
		.sidebar__show {
			margin: 45px 0 0 0 !important;
		}
	}
</style>
