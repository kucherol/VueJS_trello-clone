<template>
  <v-app>
    <Layout v-if="0" />
	<Auth v-else />
  </v-app>
</template>

<script>
import Layout from "../src/layout/Layout.vue";
import Auth from "../src/views/Auth.vue";
export default {
  name: 'App',
  components: {
    Layout,
	Auth
  },
  data: () => ({
    //
  }),
};
</script>
