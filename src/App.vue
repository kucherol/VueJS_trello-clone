<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'App',
  data() {
	return {
		check: null,
	}
  },
  components: {
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
