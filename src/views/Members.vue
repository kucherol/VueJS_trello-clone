<template>
	<div class="main">
		<v-data-table dense :headers="headers" :items="users" item-key="firstName" class="elevation-1"></v-data-table>
	</div>
</template>

<script>
import firebase from "../firebase.js";
export default {
	name: "Members",
	data: () => ({
		ref: firebase.firestore().collection('users'),
		users: [],
		headers: [
			{
				text: 'First name',
				align: 'start',
				value: 'firstName',
			},
			{
				text: 'Last Name',
				value: 'lastName'
			},
			{
				text: 'Email',
				value: 'email'
			}
		],
    }),
	methods: {
		getUsers() {
			this.ref.get()
			.then(response => {
				response.forEach((doc) => {
					this.users.push({
						firstName: doc.data().firstName,
						lastName: doc.data().lastName,
						email: doc.data().email,
						userId: doc.data().userId,
					})
				})
			})
		},
	},
	created() {
		this.getUsers();
	},
}
</script>

<style lang="scss" scoped>

</style>
