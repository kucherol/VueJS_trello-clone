<template>
  <v-app>
    <Layout v-if="isLoggedIn"/>
	<Auth  v-else />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
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
  computed: {
	...mapGetters(["isLoggedIn"])
  }
};
</script>
