<template>
	<div class="main">
		<div class="main-container">
			<v-form ref="form" v-model="valid" lazy-validation class="signUp">
				<p class="signUp__title">Please sign Up here!</p>
				<v-text-field v-model="user.firstName" label="First Name" required ></v-text-field>
				<v-text-field v-model="user.lastName" label="Last Name" required ></v-text-field>
				<v-text-field v-model="user.email" :rules="emailRules" label="E-mail" required ></v-text-field>
				<v-text-field v-model="user.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
				<v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree with something?" required ></v-checkbox>
				<div class="signUp__btns">
					<v-btn :disabled="!valid" color="success" class="mr-4" @click="signUp(user)" > Sign Up! </v-btn>
					<v-btn color="error" class="mr-4" @click="reset" > Reset Form </v-btn>
				</div>
				<router-link to="/login">
					<p class="signUp__footer">Already have an account </p>
				</router-link>
			</v-form>
		</div>
	</div>
</template>

<script>
	import {mapActions} from "vuex";
	export default {
		name: "SignUpTest",
		data: () => ({
			show1: false,
			valid: true,
			user: {
				firstName: "",
				lastName: "",
				email: "",
				userId: "",
				password: ""
			},
			emailRules: [
				v => !!v || 'E-mail is required',
				v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
			],
			checkbox: false,
			rules: {
				required: value => !!value || 'Required.',
				min: v => v.length >= 8 || 'Min 8 characters',
			},
		}),
		methods: {
			...mapActions(["signUp"]),
			reset () {
				this.$refs.form.reset()
			},
		},
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 100vw;
		height: 100vh;
		background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);
		display: flex;
		align-items: center;
		justify-content: center;
		&-container {
			background: rgba( 255, 255, 255, 0.35 );
			box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
			backdrop-filter: blur( 11px );
			-webkit-backdrop-filter: blur( 11px );
			border-radius: 10px;
			border: 1px solid rgba( 255, 255, 255, 0.18 );
			width: 32%;
			padding: 30px;
			border-radius: 15px;
		}
	}

	.signUp {
		&__btns {
			display: flex;
			justify-content: center;
			align-items: center;
		}
		&__title {
			text-align: center;
			font-size: 16px;
			font-weight: 500;
		}
		&__footer {
			margin-top: 30px;
			margin-bottom: 0 !important;
			text-align: center;
			font-size: 12px;
			font-weight: 300;
		}
	}

</style>
