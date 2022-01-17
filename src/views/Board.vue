<template>
    <div class="board" :class="this.board.color">
		<v-row class="board__header">
			<v-col sm="6" class="board__header-left" >
				<h1 v-if="h1Title" @click="changeHTMLTitle" class="board__header-left--title">{{ this.board.title }}</h1>
				<v-text-field v-model="board.title" v-if="!h1Title" solo clearable clear-icon="mdi-check" @click:clear="updateTitle" class="board__header-left--title-input"></v-text-field>
			</v-col>
		</v-row>
		<v-row class="board__table">
			<v-card v-for="(listItem, id) in sortedList" :key="id" elevation="2" outlined class="board__list" @drop="onDrop($event, listItem)" @dragover.prevent @dragenter.prevent>
				<div class="board__list--title">
					<v-card-title class="board__list--title-text">{{ listItem.title }}</v-card-title>
					<v-menu v-model="listSettings[id]" :close-on-content-click="false" :nudge-width="200" offset-y>
                        <template v-slot:activator="{ on, attrs }" >
							<v-btn class="board__list--title-button" v-bind="attrs" v-on="on">
								<v-icon class="board__list--title-icon">mdi-dots-horizontal</v-icon>
							</v-btn>
						</template>
						<v-card>
							<v-list>
								<v-list-item>
									<v-text-field v-model="listItem.title" solo class="board__header-left--title-input"></v-text-field>
								</v-list-item>
								<div class="board__list--title-menu">
									<v-btn icon large>
										<v-icon @click="updateListTitle(listItem)">mdi-check</v-icon>
									</v-btn>
									<v-btn icon large @click="closeListSettings(id)">
										<v-icon >mdi-close</v-icon>
									</v-btn>
								</div>
								<v-list-item>
									<v-menu v-model="listDelete[id]" :close-on-content-click="false" :nudge-width="200" offset-y>
										<template v-slot:activator="{ on, attrs }" >
											<v-btn class="ma-1 btn__delete--list" color="error" plain v-bind="attrs" v-on="on">Delete</v-btn>
										</template>
										<v-card>
											<v-list>
												<v-list-item>
													<p class="btn__delete--title">Delete list?</p>
												</v-list-item>
												<v-list-item>
													<div class="btn__delete--menu">
														<v-btn icon large @click="deleteList(listItem)">
															<v-icon >mdi-check</v-icon>
														</v-btn>
														<v-btn icon large @click="closeListSettings(id)">
															<v-icon >mdi-close</v-icon>
														</v-btn>
													</div>
												</v-list-item>
											</v-list>
										</v-card>
									</v-menu>
								</v-list-item>
							</v-list>
						</v-card>
					</v-menu>
				</div>
				<div class="board__list--item" v-for="(card, id) in cards" :key="id" draggable @dragstart="startDrag($event, card)">
					<div v-if="card.listID === listItem.id">
						<p class="board__list--item-text" >{{ card.title }}</p>
						<v-menu v-model="cardSettings[card.id]" :close-on-content-click="false" :nudge-width="200" offset-y>
							<template v-slot:activator="{ on, attrs }" >
								<v-btn small class="board__list--item-button" v-bind="attrs" v-on="on">
									<v-icon >mdi-pencil</v-icon>
								</v-btn>
							</template>
							<v-card>
								<v-list>
									<v-list-item>
										<v-text-field v-model="card.title" solo class="board__header-left--title-input"></v-text-field>
									</v-list-item>
									<div class="board__list--title-menu">
										<v-btn icon large @click="updateCardTitle(card)">
											<v-icon >mdi-check</v-icon>
										</v-btn>
										<v-btn icon large @click="closeCardSettings(card.id)">
											<v-icon >mdi-close</v-icon>
										</v-btn>
									</div>
									<v-list-item>
									<v-menu v-model="cardDelete[id]" :close-on-content-click="false" :nudge-width="200" offset-y>
										<template v-slot:activator="{ on, attrs }" >
											<v-btn class="ma-1 btn__delete--list" color="error" plain v-bind="attrs" v-on="on">Delete</v-btn>
										</template>
										<v-card>
											<v-list>
												<v-list-item>
													<p class="btn__delete--title">Delete card?</p>
												</v-list-item>
												<v-list-item>
													<div class="btn__delete--menu">
														<v-btn icon large @click="deleteCard(card)">
															<v-icon >mdi-check</v-icon>
														</v-btn>
														<v-btn icon large @click="closeCardDelete(id)">
															<v-icon >mdi-close</v-icon>
														</v-btn>
													</div>
												</v-list-item>
											</v-list>
										</v-card>
									</v-menu>
								</v-list-item>
								</v-list>
							</v-card>
						</v-menu>
					</div>
				</div>
				<div class="board__list--footer">
					<v-menu v-model="addCardMenu[listItem.id]" :close-on-content-click="false" :nudge-width="200" offset-y>
						<template v-slot:activator="{ on, attrs }" >
							<v-btn class="board__list--footer-button" v-bind="attrs" v-on="on">
								<v-icon class="board__list--footer-icon">mdi-plus</v-icon>
								<p class="board__list--footer-text">Add a card</p>
							</v-btn>
						</template>
						<v-card>
							<v-list>
								<v-list-item class="addCard__menu--title">
									<p class="addCard__menu--title-text">Add new card</p>
								</v-list-item>
								<v-list-item>
									<v-text-field v-model="card.title" solo class="board__header-left--title-input"></v-text-field>
								</v-list-item>
								<div class="board__list--title-menu">
									<v-btn icon large @click="addNewCard(listItem)">
										<v-icon>mdi-check</v-icon>
									</v-btn>
									<v-btn icon large @click="closeAddCardMenu(listItem.id)">
										<v-icon >mdi-close</v-icon>
									</v-btn>
								</div>
							</v-list>
						</v-card>
					</v-menu>
				</div>
			</v-card>
			<v-menu v-model="addListMenu" :close-on-content-click="false" :nudge-width="200" offset-y>
				<template v-slot:activator="{ on, attrs }" >
					<v-btn class="board__addNew" v-bind="attrs" v-on="on">
						<v-icon class="board__addNew--icon">mdi-plus</v-icon>
						<p class="board__addNew--text">Add another list</p>
					</v-btn>
				</template>
				<v-card>
					<v-list>
						<v-list-item class="addCard__menu--title">
							<p class="addCard__menu--title-text">Add new list</p>
						</v-list-item>
						<v-list-item>
							<v-text-field v-model="list.title" placeholder="List title" solo class="board__header-left--title-input"></v-text-field>
						</v-list-item>
						<div class="board__list--title-menu">
							<v-btn icon large>
								<v-icon @click="addNewList">mdi-check</v-icon>
							</v-btn>
							<v-btn icon large @click="addListMenu = false">
								<v-icon >mdi-close</v-icon>
							</v-btn>
						</div>
					</v-list>
				</v-card>
			</v-menu>
		</v-row>
	</div>
</template>

<script>
import firebase from "../firebase.js";
export default {
	name: "Board",
	data: () => ({
		h1Title: true,
		listSettings: {},
		listDelete: {},
		cardSettings: {},
		cardDelete: {},
		addCardMenu: {},
		addListMenu: false,
		ref: firebase.firestore().collection('boards'),
        board: {},
		lists: [],
		sortedList: [],
		cards: [],
		card: {
			title: null
		},
		list: {},
    }),
	methods: {
		closeCardDelete(id) {
			this.cardDelete[id] = false
		},
		closeAddCardMenu(id) {
			this.addCardMenu[id] = !this.addCardMenu[id]
		},
		closeCardSettings(id) {
			this.cardSettings[id] = !this.cardSettings[id]
		},
		closeListSettings(id) {
			this.listSettings[id] = !this.listSettings[id]
		},
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
						sortListIndex: this.lists.length,
					})
				})
				this.sortedList = this.lists.sort((a,b) => {a.sortListIndex - b.sortListIndex})
				this.getCards(this.lists.id);
			})
		},
		getCards() {
			for (let i = 0; i < this.lists.length; i++) {
				this.ref.doc(this.$route.params.boardId).collection("lists").doc(this.lists[i].id).collection("cards").get()
				.then(response => {
					response.forEach((doc) => {
						this.cards.push({
							listID: this.lists[i].id,
							id: doc.id,
							title: doc.data().title,
						})
					})
				})
			}
		},
		updateTitle() {
			this.changeHTMLTitle();
			this.ref.doc(this.$route.params.boardId).update(this.board)
			.then(() => console.log("Successfully updated"))
			.catch(function(error) {
			console.log("Error getting document:", error);
			});
		},
		updateListTitle(listItem) {
			this.closeListSettings(listItem.id);
			this.lists.forEach(function(element) {
				if ( element.id === listItem.id) {
					element = listItem;
				}
			});
			this.ref.doc(this.$route.params.boardId).collection("lists").doc(listItem.id).update({title: listItem.title})
			.then(() => console.log("Successfully updated"))
			.catch(function(error) {
			console.log("Error getting document:", error);
			});
		},
		updateCardTitle(card) {
			this.closeCardSettings(card.id);
			this.cards.forEach(function(element) {
				if ( element.id === card.id) {
					element = card;
				}
			});
			this.ref.doc(this.$route.params.boardId).collection("lists").doc(card.listID).collection("cards").doc(card.id).update({title: card.title})
			.then(() => console.log("Successfully updated"))
			.catch(function(error) {
			console.log("Error getting document:", error);
			});
		},
		addNewCard(listItem) {
			this.ref.doc(this.$route.params.boardId).collection("lists").doc(listItem.id).collection("cards").add({title: this.card.title})
			.then(() => {
				this.ref.doc(this.$route.params.boardId).collection("lists").doc(listItem.id).collection("cards").get()
				.then(response => {
					response.forEach((doc) => {
						if (this.card.title === doc.data().title) {
							this.cards.push({
							listID: listItem.id,
							id: doc.id,
							title: doc.data().title,
						})
						}
					})
				})
				})
			.catch(function(error) {
				console.log("Error getting document:", error);
			});
			this.closeAddCardMenu(listItem.id);
		},
		addNewList() {
			this.ref.doc(this.$route.params.boardId).collection("lists").add({title: this.list.title})
			.then(() => {
				this.ref.doc(this.$route.params.boardId).collection("lists").get()
				.then(response => {
					response.forEach((doc) => {
						if (this.list.title === doc.data().title) {
							this.lists.push({
							id: doc.id,
							title: doc.data().title,
							sortListIndex: this.lists.length,
						})
						}
					})
				})
				})
			.catch(function(error) {
				console.log("Error getting document:", error);
			});
			console.log(this.lists)
			this.addListMenu = !this.addListMenu
		},
		deleteCard(card) {
			let cardIndex = 0;
			this.cards.forEach(function(element, index) {
				if (element.id === card.id) {
					cardIndex = index
				}
			});
			this.cards.splice(cardIndex, 1);
			this.ref.doc(this.$route.params.boardId).collection("lists").doc(card.listID).collection("cards").doc(card.id).delete()
			.then(() => {
				console.log("card deleted", card)
				})
			.catch(function(error) {
				console.log("Error getting document:", error);
			});
			this.closeCardDelete();
		},
		deleteList(listItem) {
			for (let i = 0; i < this.cards.length; i++) {
				if (listItem.id === this.cards[i].listID) {
					let cardID = this.cards[i].id
					this.cards.splice(i, 1);
					i--;
					this.ref.doc(this.$route.params.boardId).collection("lists").doc(listItem.id).collection("cards").doc(cardID).delete();
				}
			}
			this.ref.doc(this.$route.params.boardId).collection("lists").doc(listItem.id).delete()
			.then(() => {
				for (let j = 0; j < this.lists.length; j++ ) {
					if (this.lists[j].id === listItem.id) {
						this.lists.splice(j, 1);
					}
				}
			});
		},
		startDrag (evt, card) {
			evt.dataTransfer.dropEffect = "move"
			evt.dataTransfer.effectAllowed = "move"
			evt.dataTransfer.setData("cardID", card.id)
			},
		onDrop (evt, listItem) {
			const cardID = evt.dataTransfer.getData("cardID")
			const card = this.cards.find(card => card.id == cardID)
			const copiedCardListID = card.listID
			card.listID = listItem.id
			this.ref.doc(this.$route.params.boardId).collection("lists").doc(card.listID).collection("cards").add({title: card.title,})
			.then(() => {
				this.ref.doc(this.$route.params.boardId).collection("lists").doc(copiedCardListID).collection("cards").doc(cardID).delete()
			})
		},
	},
	created() {
		this.getBoardInfo();
		this.getLists();
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
			grid-auto-rows: minmax(min-content, max-content);
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
		&__list {
			padding: 8px;
			height: fit-content;
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
				&-menu {
					display: flex;
					justify-content: center;
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
			&--item {
				border-radius: 4px;
				transition: all 0.5s;
				&:hover {
					background-color: rgba($color: #000, $alpha: 0.1) !important;
					cursor: pointer;
				}
				& div {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					position: relative;
					align-items: center;
					&:hover {
						.board__list--item-icon {
							display: flex;
							position: absolute;
							right: 10px;
							top: 5px;
							z-index: 900;
						}
					}
				}
				&-text {
					margin-bottom: 0 !important;
					padding: 4px;
					margin: 4px;
					font-size: 14px;
					font-weight: 500;
				}
				&-button {
					box-shadow: none !important;
					padding: 0 !important;
					height: inherit;
				}
			}
		}
	}

	.addCard__menu--title {
		align-items: center;
		justify-content: center;
		&-text {
			font-size: 16px;
			font-weight: 300;
			text-decoration: none;
		}
	}
	.btn {
		&__delete {
			&--menu {
				margin: auto;
			}
			&--title {
				display: block;
				margin: auto !important;
				margin-bottom: 0 !important;
				margin-top: 0 !important;
			}
			&--list {
				display: inline-block;
				margin: auto !important;
			}
		}
	}

</style>
