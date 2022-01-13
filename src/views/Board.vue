<template>
    <div class="board" :class="this.board.color">
		<v-row class="board__header">
			<v-col sm="6" class="board__header-left" >
				<h1 v-if="h1Title" @click="changeHTMLTitle" class="board__header-left--title">{{ this.board.title }}</h1>
				<v-text-field v-model="board.title" v-if="!h1Title" solo clearable clear-icon="mdi-check" @click:clear="updateTitle" class="board__header-left--title-input"></v-text-field>
			</v-col>
			<v-col sm="6" class="board__header-right" >
				<v-btn @click="test"></v-btn>
			</v-col>
		</v-row>
		<v-row class="board__table">
			<v-card v-for="(listItem, id) in lists" :key="id" elevation="2" outlined class="board__list">
				<div class="board__list--title">
					<v-card-title class="board__list--title-text">{{ listItem.title }}</v-card-title>
					<v-btn class="board__list--title-button">
						<v-icon class="board__list--title-icon">mdi-dots-horizontal</v-icon>
					</v-btn>
				</div>
				<div class="board__list--items" v-for="(card, id) in cards" :key="id">
					<p>{{ card.title }}</p>
				</div>
				<div class="board__list--footer">
					<v-btn class="board__list--footer-button">
						<v-icon class="board__list--footer-icon">mdi-plus</v-icon>
						<p class="board__list--footer-text">Add a card</p>
					</v-btn>
				</div>
			</v-card>
			<v-btn class="board__addNew">
				<v-icon class="board__addNew--icon">mdi-plus</v-icon>
				<p class="board__addNew--text">Add another list</p>
			</v-btn>
		</v-row>
	</div>
</template>

<script>
import firebase from "../firebase.js";
export default {
	name: "Board",
	data: () => ({
		h1Title: true,
		ref: firebase.firestore().collection('boards'),
        board: {},
		lists: [],
		cards: [],
    }),
	methods: {
		changeHTMLTitle() {
			this.h1Title = !this.h1Title
		},
		getBoardInfo() {
			this.ref.doc(this.$route.params.boardId).get()
			.then((doc) => {
				this.board = doc.data();
			})
			.catch(function(error) {
				console.log("Error getting document:", error);
			});
		},
		getLists() {
			this.ref.doc(this.$route.params.boardId).collection("lists").get()
			.then(response => {
				response.forEach((doc) => {
					this.lists.push({
						id: doc.id,
						title: doc.data().title,
					})
				})
			})
		},
		getCards() {
			this.ref.doc(this.$route.params.boardId).collection("lists").doc(this.lists[0].id).collection("cards").get()
			.then(response => {
				response.forEach((doc) => {
					this.cards.push({
						id: doc.id,
						title: doc.data().title,
					})
				})
			})
		},
		updateTitle() {
			this.changeHTMLTitle();
			this.ref.doc(this.$route.params.boardId).update(this.board)
			.then(() => console.log("Successfully updated"))
			.catch(function(error) {
			console.log("Error getting document:", error);
			});
		},
		test() {
			console.log(this.board)
			console.log(this.lists)
			this.getCards();
			console.log(this.cards)
		}
	},
	created() {
		this.getBoardInfo();
		this.getLists();
		this.getCards();
    },
}
</script>

<style lang="scss" scoped>
	.board {
		width: 100%;
		height: 100%;
		padding: 20px 0 0 45px;
		&__header {
			height: 50px;
			&-left {
				&--title {
					display: inline-block;
					padding: 5px;
					font-size: 16px;
					font-weight: 500;
					border-radius: 5px;
					transition: all 0.5s;
					color: #fff;
					background-color: rgba($color: #fff, $alpha: 0.2);
					&:hover {
						background-color: rgba($color: #fff, $alpha: 0.4);
						cursor: pointer;
					}
					&-input {
						width: 15vw !important;
						height: inherit !important;
						padding: 0 !important;
						margin: 0 !important;
					}
				}
			}
		}
		&__table {
			padding: 20px;
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr;
			grid-template-rows: 1fr;
			gap: 10px 10px;
			min-width: 20vw;
		}
		&__addNew {
			box-shadow: none !important;
			background-color: rgba($color: #fff, $alpha: 0.2) !important;
			color: #fff;
			&--text {
				margin-bottom: 0 !important;
				font-size: 14px;
				font-weight: 400;
				padding: 10px !important;
				text-transform: none !important;
			}
		}
	}

	.board__list {
		padding: 8px;
		&--title {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			&-button {
				padding: 0 !important;
				margin-right: 7px;
				box-shadow: none !important;
				background-color: inherit !important;
			}
			&-icon {
				padding: 10px;
			}
			&-text {
				font-size: 14px;
				font-weight: 400;
				padding: 10px !important;
			}
		}
		&--footer {
			display: flex;
			flex-direction: row;
			align-items: center;
			&-button {
				justify-content: left;
				box-shadow: none !important;
				background-color: inherit !important;
				width: 100%;
				& span p {
					margin-bottom: 0 !important;
					font-size: 14px;
					font-weight: 400;
					padding: 10px !important;
					text-transform: none !important;
				}
			}
		}
	}

</style>
