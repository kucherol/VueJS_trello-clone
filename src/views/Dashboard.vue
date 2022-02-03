<template>
    <div class="boards">
        <section class="boards__viewed" v-if="involvedBoards">
            <div class="boards__viewed--title">
                <v-icon class="title-icon">{{ clockIcon }}</v-icon>
                <p class="title-text">Common boards:</p>
            </div>
            <div class="boards__your--table" >
                <a class="board-card" v-for="board in involvedBoards" :key="board.id" :class="board.color" @click.prevent="goToBoard(board)">
                    <p class="board-card--text">{{ board.title }}</p>
					<p class="board-card--text board-card--text-name">{{ board.fullName }}</p>
                </a>
            </div>
        </section>
        <section class="boards__viewed boards__your">
            <div class="boards__viewed--title boards__your--title">
                <div class="workspace__icon--container">
                    <p class="workspace__icon">W</p>
                </div>
                <p class="title-text">Your workspace</p>
            </div>
            <div class="boards__your--table">
                <a v-for="(board, id) in boards" :key="id" class="board-card" :class="board.color" @click.prevent="goToBoard(board)">
                    <p class="board-card--text">{{ board.title }}</p>
					<v-menu v-model="boardControl[id]" :close-on-content-click="false" :nudge-width="200" offset-y>
						<template v-slot:activator="{ on, attrs }" >
							<v-btn class="mx-2 board-card--icon-container" fab small v-bind="attrs" v-on="on">
                                <v-icon class="board-card--icon">mdi-pencil</v-icon>
                            </v-btn>
						</template>
						<v-card>
							<v-dialog v-model="boardControl[id]" max-width="500px">
								<v-card class="card-settings">
									<v-card-title>
										<v-text-field v-model="board.title" solo class="board__header-left--title-input" hide-details="auto" @change="onBoardTitleChange = true" ></v-text-field>
									</v-card-title>
									<v-card-text>
										<v-autocomplete v-model="board.involvedUsers" :items="usersName" dense chips small-chips label="Add new user:" multiple class="autocomplete autocomplete__styles"></v-autocomplete>
									</v-card-text>
									<v-card-actions class="card-settings__menu--actions">
										<div class="card-settings__menu--actions-left">
											<v-menu v-model="openDeleteBoard[board.id]" :close-on-content-click="false" :nudge-width="200" offset-y>
												<template v-slot:activator="{ on, attrs }" >
													<v-btn class="ma-1 btn__delete--list" color="error" plain v-bind="attrs" v-on="on">Delete</v-btn>
												</template>
												<delete-board @closeDeleteBoard="closeDeleteBoard" :id="board.id" />
											</v-menu>
										</div>
										<div class="card-settings__menu--actions-right">
											<v-btn color="green" text @click="boardControlConfirm(board)">Confirm</v-btn>
											<v-btn color="primary" text @click="closeBoardControl(id)">Close</v-btn>
										</div>
									</v-card-actions>
								</v-card>
							</v-dialog>
						</v-card>
					</v-menu>
                </a>
            </div>
        </section>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import firebase from "../firebase";
import { mdiClockOutline, mdiTrashCanOutline } from '@mdi/js';
import DeleteBoard from "../components/ViewComponents/BoardComponent/DeleteBoard.vue";
export default {
    name: "Dashboard",
    components: {
        DeleteBoard,
    },
    data: () => ({
        clockIcon: mdiClockOutline,
        deleteIcon: mdiTrashCanOutline,
        openDeleteBoard: {},
		involvedBoards: [],
		boardControl: {},
		usersName: [],
		usersAdded: [],
		newBoard: {
			title: null,
			involvedUsers: [],
			boardOwner: null,
		},
		onBoardTitleChange: false,
    }),
    methods: {
		...mapActions(["getBoardsList", "getAllBoards", "getUsersList", "getAllBoards","getActiveBoard"]),
        closeDeleteBoard(value) {
            this.openDeleteBoard[value] = false
        },
		closeBoardControl(id) {
			this.boardControl[id] = false;
		},
        async goToBoard(board) {
			await this.getActiveBoard(board);
            this.$router.push({
                name: "Board",
                params: { boardId: board.id },
			});
			localStorage.setItem("lastBoardVisited", board.id)
        },
		getNames() {
			this.users.forEach(el => {
				if (this.user.firstName !== el.firstName && this.user.lastName !== el.lastName) {
					this.usersName.push(el.firstName + " " + el.lastName)
				}
			})
		},
		boardControlConfirm(board) {
			this.newBoard.title = board.title;
			this.newBoard.color = board.color;
			this.newBoard.involvedUsers = board.involvedUsers ? board.involvedUsers : [""];
			this.newBoard.boardOwner = this.user.id;
			firebase.firestore().collection('users').doc(this.user.id).collection("boards").doc(board.id).update(this.newBoard)
			.then(() => this.$store.dispatch("showNotification", { type: "success", message: "Updated" }))
			.catch(function(error) {
			this.$store.dispatch("showNotification", { type: "error", message: error.message });
			});
		},
		chooseInvolvedBoards() {
			this.boardsList.forEach((el) => {
				if (el.involvedUsers) {
					el.involvedUsers.forEach((e) => {
						if (e == this.user.firstName + " " + this.user.lastName) {
							this.users.forEach((user) => {
								if (user.id === el.boardOwner) {
									el.fullName = user.firstName + " " + user.lastName;
								}
							})
							this.involvedBoards.push(el);
						}
					})
				}
			})
		},
    },
	computed: {
		...mapGetters(["users", "user", "boards", "boardsList"]),
	},
    async created() {
        await this.getBoardsList(this.$route.params.dashboardId);
		await this.getUsersList();
		await this.getAllBoards();
		this.chooseInvolvedBoards();
		this.getNames();
    }

}
</script>

<style lang="scss" scoped>
    .boards {
		padding: 20px 0 0 45px;
        &__viewed {
            &--title {
                display: flex;
                align-items: center;
                margin-top: 20px;
            }
        }
        &__your {
            &--table {
                margin-top: 30px;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
                gap: 15px 10px;
            }
        }
    }

    .title {
        &-icon {
        margin-right: 20px;
        }
        &-text {
            font-weight: 500;
        }
    }

    .workspace__icon {
        font-size: 16px;
        color: #fff;
        &--container {
            width: 35px;
            height: 35px;
            background: linear-gradient(#403294, #0747a6);
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
        }
    }

    .board-card {
        position: relative;
        height: 150px;
        width: 200px;
        border-radius: 5px;
        margin: auto;
        transition: all 0.5s;
        &:hover {
            box-shadow: 0px 0px 60px 7px rgba(34, 60, 80, 0.5) inset;
            .board-card--text {
                font-size: 18px;
                margin: 30px 0 0 30px;
            }
            .board-card--icon-container {
               display: inline-block;
            }
			.board-card--text-name {
				display: block;
			}
        }
        &--text {
            display: inline-block;
            color: #fff;
            font-weight: 500;
            font-size: 16px;
            margin: 10px 0 0 10px;
            transition: all 0.5s;
			&-name {
				display: none;
			}
        }
        &--icon {
            &-container {
                position: absolute;
                background-color: rgba(0, 0, 0, 0) !important;
                box-shadow: none !important;
                right: 10px;
                top: 10px;
                color: #fff;
                display: none;
                transition: all 1s;
                z-index: 999;
            }
        }
    }

    p {
        margin-bottom: 0;
    }

	.autocomplete__styles {
		margin-top: 15px !important;
	}

</style>
