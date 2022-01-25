<template>
    <div class="text-center">
		<v-snackbar v-model="show" :timeout="notificationTimeout" top outlined :color= "notificationType" right>{{ notificationMessage }}
			<template v-slot:action="{ attrs }">
				<v-btn :color= notificationType text v-bind="attrs" @click="hideNotification">Close </v-btn>
			</template>
		</v-snackbar>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "BaseNotification",

	computed: {
		...mapGetters(["notificationToggle", "notificationTimeout", "notificationMessage", "notificationType"]),
		show: {
			get() {
				return this.notificationToggle;
			},
			set(value) {
				return this.notificationToggleCall(value)
			},
		},
	},

	methods: {
		...mapActions(["hideNotification", "notificationToggleCall"]),
	},
}
</script>
