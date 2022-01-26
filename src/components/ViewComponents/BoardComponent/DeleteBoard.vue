<template>
    <v-card >
        <v-list>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title >Delete board?</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item class="control">
                <v-list-item-action class="control-list">
                    <v-btn icon large @click.prevent="deleteBoard">
                        <v-icon class="icon-ok">mdi-check</v-icon>
                    </v-btn>
                    <v-btn icon large @click="closeDeleteBoard">
                        <v-icon class="icon-close">mdi-close</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
import firebase from "../../../firebase.js";
import { mapGetters, mapActions } from "vuex";
export default {
    name: "DeleteBoard",
	data() {
		return {
			lists: [],
			cards: [],
		}
	},
    props: {
        id: {
            type: String,
        }
    },
    methods: {
		...mapActions(["getBoardsList"]),
        closeDeleteBoard() {
            this.$emit("closeDeleteBoard", this.id);
        },
		getLists() {
			firebase.firestore().collection('users').doc(this.user.id).collection("boards").doc(this.id).collection("lists").get()
			.then(response => {
				response.forEach((doc) => {
					this.lists.push({
						id: doc.id,
						title: doc.data().title,
						sortListIndex: doc.data().sortListIndex,
					})
				})
				this.getCards();
			})
		},
		getCards() {
			for (let i = 0; i < this.lists.length; i++) {
				firebase.firestore().collection('users').doc(this.user.id).collection("boards").doc(this.id).collection("lists").doc(this.lists[i].id).collection("cards").get()
				.then(response => {
					response.forEach((doc) => {
						this.cards.push({
							listID: this.lists[i].id,
							id: doc.id,
							title: doc.data().title,
							information: doc.data().information,
							sortCardIndex: doc.data().sortCardIndex,
						})
					})
				})
			}
		},

        deleteBoard() {
			for (let i = 0; i < this.lists.length; i++) {
				console.log(this.lists.length, i)
				for (let j = 0; j < this.cards.length; j++) {
					firebase.firestore().collection('users').doc(this.user.id).collection("boards").doc(this.id).collection("lists").doc(this.lists[i].id).collection("cards").doc(this.cards[j].id).delete()
					.catch((error) => {console.log(error)});
				}
				firebase.firestore().collection('users').doc(this.user.id).collection("boards").doc(this.id).collection("lists").doc(this.lists[i].id).delete()
				.catch((error) => {console.log(error)});
			}
            firebase.firestore().collection("users").doc(this.user.id).collection("boards").doc(this.id).delete()
			.then(() => {
				this.getBoardsList(this.$route.params.dashboardId);
                this.closeDeleteBoard();
                this.$store.dispatch("showNotification", { type: "success", message: "Board deleted" });
            }).catch((error) => {
                this.$store.dispatch("showNotification", { type: "error", message: error.message });
            });
        }
    },
	computed: {
		...mapGetters(["user"])
	},
	created() {
		this.getLists();
	},
}
</script>

<style lang="scss" scoped>
    .control {
        justify-content: center;
        &-list {
            flex-direction: row;
            margin: 0 !important;
            & button {
                margin: 10px;
                padding: 15px;
                &:hover {
                    background-color: rgba($color: #026AA7, $alpha: 0.3);
                    .icon {
                        &-close {
                            color: red !important;
                        }
                        &-ok {
                            color: green !important;
                        }
                    }
                }
            }
        }
    }
</style>
