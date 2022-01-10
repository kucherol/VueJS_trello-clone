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
			}
		}
	}

</script>

<style lang="scss" scoped>
	.main-content {
		width: 100%;
		padding: 50px 45px 45px 45px !important;
	}

	.sidebar__show {
		padding: 50px 45px 45px 300px !important;
	}

</style>
