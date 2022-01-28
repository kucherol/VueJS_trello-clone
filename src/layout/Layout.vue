<template>
    <v-app>
        <div class="layout">
            <Header :windowWidth="windowWidth"/>
            <Content :showSidebar="showSidebar"/>
        </div>
		<Sidebar v-if="windowWidth >= 1292" @openSidebar="openSidebar"/>
	</v-app>
</template>

<script>
import Header from "../components/ViewComponents/LayoutComponent/Header.vue";
import Sidebar from "../components/ViewComponents/LayoutComponent/Sidebar.vue";
import Content from "../components/ViewComponents/LayoutComponent/Content.vue";
export default {
    name: "Layout",
    components: {
        Header,
        Sidebar,
        Content
    },
    data: () => ({
        showSidebar: true,
		windowWidth: 0,
    }),
    methods: {
        openSidebar(value) {
            this.showSidebar = value;
        },
		getWindowWidth() {
			this.windowWidth = document.documentElement.clientWidth;
		},
    },
	mounted() {
		this.$nextTick(function() {
			window.addEventListener('resize', this.getWindowWidth);
			this.getWindowWidth()
		})
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.getWindowWidth);
	}
}
</script>

<style lang="scss" scoped>
    .layout {
        margin: 0;
    }
</style>
