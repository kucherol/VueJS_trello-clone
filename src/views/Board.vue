<template>
    <div class="board__container">
		<h1 class="board__title" @click="test">{{ this.board.title }}</h1>
	</div>
</template>

<script>
import firebase from "../firebase.js";
export default {
	name: "Board",
	data: () => ({
        board: {},
    }),
	methods: {
		test() {
			console.log(this.board)
		},
	},
	created() {
		firebase.firestore().collection("boards").doc(this.$route.params.boardId).get()
		.then(function(doc) {
			if (doc.exists) {
				console.log("Document data:", doc.data());
			} else {
				console.log("No such document!");
			}
		})
		.catch(function(error) {
			console.log("Error getting document:", error);
		});
    },
}
</script>

<style>

</style>
