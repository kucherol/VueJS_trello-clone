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
		padding: 45px 0 0 35px !important;
	}

	.sidebar__show {
		padding: 45px 0 0 270px !important;
	}

</style>
