<template>
  <v-app>
    <router-view></router-view>
	<base-notification></base-notification>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseNotification from './components/BaseComponents/BaseNotification.vue';
export default {
  name: 'App',
  data() {
	return {
		check: null,
	}
  },
  components: {
	BaseNotification,
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
