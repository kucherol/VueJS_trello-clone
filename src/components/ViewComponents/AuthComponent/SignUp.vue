<template>
	<div class="login">
		<v-form ref="form" v-model="valid" lazy-validation class="logi__form">
			<v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required ></v-text-field>
			<v-text-field v-model="email" :rules="emailRules" label="E-mail" required ></v-text-field>
			<v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree with something?" required ></v-checkbox>
			<v-btn :disabled="!valid" color="success" class="mr-4" @click="validate" > Confirm </v-btn>
			<v-btn color="error" class="mr-4" @click="reset" > Reset Form </v-btn>
		</v-form>
	</div>
</template>

<script>
	export default {
		name: "SignUp",
		data: () => ({
			valid: true,
			name: '',
			nameRules: [
				v => !!v || 'Name is required',
				v => (v && v.length <= 10) || 'Name must be less than 10 characters',
			],
			email: '',
			emailRules: [
				v => !!v || 'E-mail is required',
				v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
			],
			checkbox: false,
		}),
		methods: {
			validate () {
				this.$refs.form.validate()
			},
			reset () {
				this.$refs.form.reset()
			},
		},
	}
</script>

<style>

</style>
