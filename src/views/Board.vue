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
				<div class="board__list--item" v-for="(card, id) in sortedCards" :key="id" draggable @dragstart="startDrag($event, card)">
					<div v-if="card.listId === listItem.id">
						<p class="board__list--item-text" >{{ card.title }}</p>
						<v-menu v-model="cardControl[id]" :close-on-content-click="false" :nudge-width="200" offset-y>
							<template v-slot:activator="{ on, attrs }" >
								<v-btn small class="board__list--item-button" v-bind="attrs" v-on="on">
									<v-icon >mdi-pencil</v-icon>
								</v-btn>
							</template>
							<v-card>
								<v-dialog v-model="cardControl[id]" max-width="500px">
									<v-card class="card-settings">
										<v-card-title>
											<v-text-field v-model="card.title" solo class="board__header-left--title-input" hide-details="auto"></v-text-field>
										</v-card-title>
										<v-card-text>
											<div class="font-weight-medium">Assign to:</div>
											<v-select label="Choose person assign to" item-value="text" v-model="assignTo" :items="usersName"></v-select>
										</v-card-text>
										<v-card-text>
											<v-textarea outlined name="input-7-4" v-model="card.information" label="Additional information" @change="onCardInformationChange = true"></v-textarea>
										</v-card-text>
										<v-card-actions class="card-settings__menu--actions">
											<div class="card-settings__menu--actions-left">
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
											</div>
											<div class="card-settings__menu--actions-right">
												<v-btn color="green" text @click="cardControlConfirm(card)">Confirm</v-btn>
												<v-btn color="primary" text @click="closeCardControl(id)">Close</v-btn>
											</div>
										</v-card-actions>
									</v-card>
								</v-dialog>
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
								<v-list-item>
									<v-textarea v-model="card.information" outlined name="input-7-4" label="Additional information" ></v-textarea>
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
							<v-btn icon large @click="addNewList">
								<v-icon >mdi-check</v-icon>
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
import {  mapGetters } from "vuex";
import firebase from "../firebase.js";
export default {
	name: "Board",
	data: () => ({
		h1Title: true,
		listSettings: {},
		listDelete: {},
		cardSettings: {},
		cardDelete: {},
		cardControl: {},
		addCardMenu: {},
		addListMenu: false,
		ref: firebase.firestore().collection('users'),
        board: {},
		lists: [],
		sortedList: [],
		cards: [],
		sortedCards: [],
		card: {
			title: null,
			information: null
		},
		list: {
			title: null
		},
		cardDialog: false,
		usersName: [],
		assignTo: null,
		onCardTitleChange: false,
		onCardInformationChange: false,
    }),
	methods: {
		closeCardControl(id) {
			this.cardControl[id] = false
		},
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
			this.ref.doc(this.user.id).collection("boards").doc(this.$route.params.boardId).get()
			.then((doc) => {
				this.board = doc.data();
			})
			.catch(function(error) {
				console.log("Error getting document:", error);
			});
		},
		getLists() {
			this.ref.doc(this.user.id).collection("boards").doc(this.$route.params.boardId).collection("lists").get()
			.then(response => {
				response.forEach((doc) => {
					this.lists.push({
						id: doc.id,
						title: doc.data().title,
						sortListIndex: doc.data().sortListIndex,
					})
				})
				this.sortedList = this.lists.sort(function(a,b) {return a.sortListIndex - b.sortListIndex})
				this.getCards(this.lists.id);
			})
		},
		getCards() {
			for (let i = 0; i < this.lists.length; i++) {
				this.ref.doc(this.user.id).collection("boards").doc(this.$route.params.boardId).collection("lists").doc(this.lists[i].id).collection("cards").get()
				.then(response => {
					response.forEach((doc) => {
						this.cards.push({
							listId: this.lists[i].id,
							id: doc.id,
							title: doc.data().title,
							information: doc.data().information,
							sortCardIndex: doc.data().sortCardIndex,
						})
					})
					this.sortedCards = this.cards.sort(function(a,b) {return a.sortCardIndex - b.sortCardIndex})
				})
			}
		},
		updateTitle() {
			this.changeHTMLTitle();
			this.ref.doc(this.user.id).collection("boards").doc(this.$route.params.boardId).update(this.board)
			.then(() => this.$store.dispatch("showNotification", { type: "success", message: "Updated" }))
			.catch(function(error) {
			this.$store.dispatch("showNotification", { type: "error", message: error.message });
			});
		},
		updateListTitle(listItem) {
			this.closeListSettings(listItem.id);
			this.lists.forEach(function(element) {
				if ( element.id === listItem.id) {
					element = listItem;
				}
			});
			this.ref.doc(this.user.id).collection("boards").doc(this.$route.params.boardId).collection("lists").doc(listItem.id).update({title: listItem.title})
			.then(() => this.$store.dispatch("showNotification", { type: "success", message: "Updated" }))
			.catch(function(error) {
			this.$store.dispatch("showNotification", { type: "error", message: error.message });
			});
		},
		updateCardTitle(card) {
			this.closeCardSettings(card.id);
			this.cards.forEach(function(element) {
				if ( element.id === card.id) {
					element = card;
				}
			});
			this.ref.doc(this.user.id).collection("boards").doc(this.$route.params.boardId).collection("lists").doc(card.listId).collection("cards").doc(card.id).update({title: card.title})
			.then(() => this.$store.dispatch("showNotification", { type: "success", message: "Updated" }))
			.catch(function(error) {
			this.$store.dispatch("showNotification", { type: "error", message: error.message });
			});
		},
		updateCardInformation(card) {
			this.closeCardSettings(card.id);
			this.cards.forEach(function(element) {
				if ( element.id === card.id) {
					element = card;
				}
			});
			this.ref.doc(this.user.id).collection("boards").doc(this.$route.params.boardId).collection("lists").doc(card.listId).collection("cards").doc(card.id).update({information: card.information})
			.then(() => this.$store.dispatch("showNotification", { type: "success", message: "Updated" }))
			.catch(function(error) {
			this.$store.dispatch("showNotification", { type: "error", message: error.message });
			});
		},
		addNewCard(listItem) {
			this.ref.doc(this.user.id).collection("boards").doc(this.$route.params.boardId).collection("lists").doc(listItem.id).collection("cards").add({title: this.card.title, sortCardIndex: this.cards.length, information: this.card.information, listId: listItem.id})
			.then(() => {
				this.$store.dispatch("showNotification", { type: "success", message: "New card was created" })
				this.ref.doc(this.user.id).collection("boards").doc(this.$route.params.boardId).collection("lists").doc(listItem.id).collection("cards").get()
				.then(response => {
					response.forEach((doc) => {
						if (this.card.title === doc.data().title) {
							this.cards.push({
							listId: doc.data().listId,
							id: doc.id,
							title: doc.data().title,
							information: doc.data().information,
							sortCardIndex: doc.data().sortCardIndex,
						})
						}
					})
				})
				})
			.catch(function(error) {
				this.$store.dispatch("showNotification", { type: "error", message: error.message });
			});
			this.closeAddCardMenu(listItem.id);
		},
		addNewList() {
			this.ref.doc(this.user.id).collection("boards").doc(this.$route.params.boardId).collection("lists").add({title: this.list.title, sortListIndex: this.lists.length })
			.then(() => {
				this.$store.dispatch("showNotification", { type: "success", message: "New list was created" })
				if (this.lists.length) {
					this.ref.doc(this.user.id).collection("boards").doc(this.$route.params.boardId).collection("lists").get()
					.then(response => {
					response.forEach((doc) => {
						if (this.list.title === doc.data().title) {
							this.lists.push({
							id: doc.id,
							title: doc.data().title,
							sortListIndex: doc.data().sortListIndex,
						})
						}
					})
				})
				} else {
					this.getLists();
				}
				})
			.catch(function(error) {
				this.$store.dispatch("showNotification", { type: "error", message: error.message });
			});
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
			this.ref.doc(this.user.id).collection("boards").doc(this.$route.params.boardId).collection("lists").doc(card.listId).collection("cards").doc(card.id).delete()
			.then(() => {
				this.$store.dispatch("showNotification", { type: "success", message: "Card deleted" })
				})
			.catch(function(error) {
				this.$store.dispatch("showNotification", { type: "error", message: error.message });
			});
			this.closeCardDelete();
		},
		deleteList(listItem) {
			for (let i = 0; i < this.cards.length; i++) {
				if (listItem.id === this.cards[i].listId) {
					let cardID = this.cards[i].id
					this.cards.splice(i, 1);
					i--;
					this.ref.doc(this.user.id).collection("boards").doc(this.$route.params.boardId).collection("lists").doc(listItem.id).collection("cards").doc(cardID).delete();
				}
			}
			this.ref.doc(this.user.id).collection("boards").doc(this.$route.params.boardId).collection("lists").doc(listItem.id).delete()
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
			const copiedCardListID = card.listId
			card.listId = listItem.id
			this.ref.doc(this.user.id).collection("boards").doc(this.$route.params.boardId).collection("lists").doc(card.listId).collection("cards").add({title: card.title,})
			.then(() => {
				this.ref.doc(this.user.id).collection("boards").doc(this.$route.params.boardId).collection("lists").doc(copiedCardListID).collection("cards").doc(cardID).delete()
			})
		},
		getNames() {
			this.users.forEach(el => {
				if (this.user.firstName !== el.firstName && this.user.lastName !== el.lastName) {
					this.usersName.push(el.firstName + " " + el.lastName)
				}
			})
		},
		cardControlConfirm(card) {
			if (this.onCardTitleChange) {
				this.updateCardTitle(card);
			}
			if (this.onCardInformationChange) {
				this.updateCardInformation(card);
			}
			if (this.assignTo) {
				let str = this.assignTo.split(" ");
				let mainUser = {};
				this.users.forEach(el => {
					if (el.firstName === str[0] && el.lastName === str[1]) {
						mainUser = el;
					}
				})

				firebase.firestore().collection("users").doc(mainUser.id).collection("boards").get()
					.then(response => {
						let boards = [];
						let boardId = null;
						let checkedBoard = false;
						response.forEach((doc) => {
							boards.push({
								id: doc.id,
								title: doc.data().title,
								color: doc.data().color,
							})
						})
						boards.forEach(el => {
							if (el.title === "Assigned to you") {
								boardId = el.id;
								checkedBoard = true;
							}
						})
						if (checkedBoard) {
							firebase.firestore().collection("users").doc(mainUser.id).collection("boards").doc(boardId).collection("lists").get()
							.then(response => {
								let newList = [];
								let listId = null;
								let checkedList = false;
								response.forEach((doc) => {
									newList.push({
										id: doc.id,
										title: doc.data().title,
										sortListIndex: doc.data().sortListIndex,
									})
								})
								newList.forEach(el => {
									if (el.title === "Assigned tasks") {
										listId = el.id;
										checkedList = true;
									}
								})
							if (checkedList) {
								firebase.firestore().collection("users").doc(mainUser.id).collection("boards").doc(boardId).collection("lists").doc(listId).collection("cards").add({title: card.title, information: card.information, sortCardIndex: "0"})
								.then(() => {
									console.log("card added", card )
								}).catch((error) => {
									console.log(error);
								});
							} else {
								firebase.firestore().collection("users").doc(mainUser.id).collection("boards").doc(boardId).collection("lists").add({title: "Assigned tasks", sortListIndex: this.lists.length })
								.then(() => {
									firebase.firestore().collection("users").doc(mainUser.id).collection("boards").doc(boardId).collection("lists").get()
									.then(response => {
										let newList = [];
										let listId = null;
										response.forEach((doc) => {
											newList.push({
												id: doc.id,
												title: doc.data().title,
												sortListIndex: doc.data().sortListIndex,
											})
										})
										newList.forEach(el => {
											if (el.title === "Assigned tasks") {
												listId = el.id;
											}
										})
										firebase.firestore().collection("users").doc(mainUser.id).collection("boards").doc(boardId).collection("lists").doc(listId).collection("cards").add({title: card.title, sortCardIndex: "0"})
										.then(() => {
											console.log("card added", card )
										}).catch((error) => {
										console.log(error);
										});
									})
								})
							}
							})
						} else {
							firebase.firestore().collection("users").doc(mainUser.id).collection("boards").add({title: "Assigned to you", color: "red" })
							.then(() => {
								firebase.firestore().collection("users").doc(mainUser.id).collection("boards").get()
								.then(response => {
									let boards = [];
									let boardId = false;
									response.forEach((doc) => {
										boards.push({
											id: doc.id,
											title: doc.data().title,
											color: doc.data().color,
										})
									})
									boards.forEach(el => {
										if (el.title === "Assigned to you") {
											boardId = el.id;
										}
									})
									firebase.firestore().collection("users").doc(mainUser.id).collection("boards").doc(boardId).collection("lists").add({title: "Assigned tasks", sortListIndex: this.lists.length })
									.then(() => {
										firebase.firestore().collection("users").doc(mainUser.id).collection("boards").doc(boardId).collection("lists").get()
										.then(response => {
											let newList = [];
											let listId = null;
											response.forEach((doc) => {
												newList.push({
													id: doc.id,
													title: doc.data().title,
													sortListIndex: doc.data().sortListIndex,
												})
											})
											newList.forEach(el => {
												if (el.title === "Assigned tasks") {
													listId = el.id;
												}
											})
											firebase.firestore().collection("users").doc(mainUser.id).collection("boards").doc(boardId).collection("lists").doc(listId).collection("cards").add({title: card.title, sortCardIndex: "0"})
											.then(() => {
												console.log("card added", card )
											})
										})
									})
								}).catch((error) => {
								console.log(error);
								});
							})
						}
					})
			}
		},
	},
	computed: {
		...mapGetters(["user", "users"]),
	},
	created() {
		this.getBoardInfo();
		this.getLists();
		this.getNames();
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
			grid-auto-rows: 1fr;
			gap: 10px 10px;
			min-width: 20vw;
			grid-auto-rows: minmax(min-content, max-content);
			overflow-y: auto;
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
			background: rgba( 255, 255, 255, 0.5 );
			box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
			backdrop-filter: blur( 20px );
			-webkit-backdrop-filter: blur( 20px );
			border-radius: 10px;
			border: 1px solid rgba( 255, 255, 255, 0.18 );
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

	.card-settings {
		&__menu--actions {
			display: flex;
			justify-content: space-between;
		}
	}

	@media screen and (max-width: 1000px) {
		.board__table {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}

	@media screen and (max-width: 600px) {
		.board__table {
			grid-template-columns: 1fr 1fr;
		}
	}

</style>
