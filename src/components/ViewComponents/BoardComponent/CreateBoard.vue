<template>
    <v-card >
        <v-list>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="text-title">Create Board</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                    <v-btn icon small>
                        <v-icon @click="closeCreateBoard">mdi-close</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list>
            <v-list-item class="list-item__img">
                <div class="img__container" :class="this.board.color">
                    <img src="../../../assets/img/create-board.svg" alt="information picture" class="img__svg" >
                </div>
            </v-list-item>
            <v-list-item class="list-item">
                <v-list-item-title class="text-title">Background</v-list-item-title>
            </v-list-item>
            <v-list-item class="list-item">
                <div class="background-table">
                    <v-btn v-for="block in blocks" :key="block.id" @click="chooseColor(block)" class="background-table__item" :class="block"></v-btn>
                </div>
            </v-list-item>
            <v-list-item class="list-item list-item__board-title">
                <v-text-field v-model="board.title" label="Board title*" outlined></v-text-field>
                <v-btn @click.prevent="createBoard" :disabled="isDisabled()" elevation="2" small>Create</v-btn>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import firebase from "../../../firebase.js";
export default {
    name: "CreateBoard",
    data() {
        return {
            blocks: ["blue", "green", "orange", "yellow"],
            board: {
                color: "blue",
                title: ""
            },
            title: null,
            ref: firebase.firestore().collection('users'),
        }
    },
    methods: {
		...mapActions(["getBoardsList"]),
        closeCreateBoard() {
            this.$emit("closeCreateBoard", false);
        },
        chooseColor(value) {
            this.board.color = value;
        },
        createBoard() {
            this.ref.doc(this.user.id).collection("boards").add({title: this.board.title, color: this.board.color })
			.then(() => {
                this.closeCreateBoard();
                this.board.color = ""
                this.board.title = ""
				this.getBoardsList()
            }).catch((error) => {
                console.log(error);
            });
        },
        isDisabled() {
            if (this.board.title.length < 3) {
                return true
            } else {
                return false
            }
        }
    },
	computed: {
		...mapGetters(["user"])
	}
}
</script>

<style lang="scss" scoped>
    .list-item {
        &__img {
            justify-content: center;
        }
        &__board-title {
            margin-top: 15px;
            flex-direction: column;
            min-height: 0 !important;
            & .v-input {
                width: 100% !important;
            }
            & button {
                margin-bottom: 15px;
            }
        }
    }

    .img {
        &__container {
            padding: 15px;
            background-color: blue;
        }
    }

    .background-table {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 10px 10px;
        justify-items: center;
        &__item {
            width: 35px !important;
            height: 35px !important;
            padding: 0 !important;
            min-width: auto !important;
            &:active {
                border: 2px solid black;
            }
        }
    }

    .text-title {
        font-size: 14px !important;
    }
</style>
