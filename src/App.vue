<template>
  <v-app>
    <Layout v-if="isLoggedIn && checked" />
	<Auth  v-else />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import Layout from "../src/layout/Layout.vue";
import Auth from "../src/views/Auth.vue";
export default {
  name: 'App',
  data() {
	return {
		check: null,
	}
  },
  components: {
    Layout,
	Auth
  },
  computed: {
	...mapGetters(["isLoggedIn"]),
	checked() {
		if(this.$route.path == "/login" || this.$route.path == "/signup" ) {
			return false
		} else {
			return true
		}
	}
  }
};
</script>
