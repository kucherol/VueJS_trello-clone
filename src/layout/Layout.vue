<template>
    <v-app>
        <div class="layout">
            <Header />
            <Content :showSidebar="showSidebar"/>
            <Sidebar @openSidebar="openSidebar"/>
        </div>
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
    }),
    methods: {
        openSidebar(value) {
            this.showSidebar = value;
        }
    }
}
</script>

<style lang="scss" scoped>
    .layout {
        margin: 0;
    }
</style>
