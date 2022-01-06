<template>
    <v-app>
        <Header />
        <Sidebar />
	</v-app>
</template>

<script>
import Header from "../components/ViewComponents/LayoutComponent/Header.vue";
import Sidebar from "../components/ViewComponents/LayoutComponent/Sidebar.vue";
export default {
    name: "Layout",
    components: {
        Header,
        Sidebar
    }
}
</script>

<style>

</style>