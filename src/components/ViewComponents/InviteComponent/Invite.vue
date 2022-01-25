<template>
	<div class="main">
		<v-dialog v-model="show" max-width="500px">
			<v-card>
				<v-card-title>Invite</v-card-title>
				<v-card-text>
					<v-text-field v-model="templateParams.email" :rules="emailRules" label="E-mail" required ></v-text-field>
					<v-textarea outlined name="input-7-4" label="Additional message" v-model="templateParams.message" ></v-textarea>
				</v-card-text>
				<v-card-actions class="btn__panel">
					<v-btn color="primary" text @click="inviteModal(false)">Close</v-btn>
					<v-btn color="green" text @click="sendEmail">Send</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import emailjs from "emailjs-com";
import { mapGetters, mapActions } from 'vuex'
export default {
	name: "Invite",
	data() {
		return {
			templateParams: {
				email: null,
				message: "",
			},
			emailRules: [
				v => !!v || 'E-mail is required',
				v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
			],
		}
	},
	methods: {
		...mapActions(["inviteModal"]),
		async sendEmail() {
			await emailjs.send("service_54x4vp4", "template_yq0n27x", this.templateParams, "user_v1LzBq5pB0LofNbZ8fCph")
			.then((resp) => {
				this.$store.dispatch("showNotification", { type: "success", message: "Your invitation was successfully sent" });
				console.log('SUCCESS!', resp.status, resp.text);
			})
			.catch((error) => {
				this.$store.dispatch("showNotification", { type: "error", message: error.message });
			});
			this.templateParams.email = ""
			this.templateParams.message = ""
			this.inviteModal(false)
		},
	},
	computed: {
		...mapGetters(["emailInvite"]),
		show: {
			get() {
				return this.emailInvite;
			},
			set(value) {
				return this.inviteModal(value)
			},
		},
	}

}
</script>

<style lang="scss" scoped >
	.btn__panel {
		justify-content: space-between;
	}


</style>
