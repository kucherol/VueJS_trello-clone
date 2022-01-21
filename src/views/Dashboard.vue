<template>
    <div class="boards">
        <section class="boards__viewed">
            <div class="boards__viewed--title">
                <v-icon class="title-icon">{{ clockIcon }}</v-icon>
                <p class="title-text">Recently viewed</p>
            </div>
            <div class="boards__viewed--table">
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
                <a v-for="(board, id) in boards" :key="id" class="board-card" :class="board.color" @click.prevent="goToBoard(board.id)">
                    <p class="board-card--text">{{ board.title }}</p>
                    <v-menu v-model="openDeleteBoard[board.id]" :close-on-content-click="false" :nudge-width="200" offset-y>
                        <template v-slot:activator="{ on, attrs }" >
                            <v-btn class="mx-2 board-card--icon-container" fab small v-bind="attrs" v-on="on">
                                <v-icon class="board-card--icon">{{ deleteIcon }}</v-icon>
                            </v-btn>
                        </template>
                        <delete-board @closeDeleteBoard="closeDeleteBoard" :id="board.id" />
                    </v-menu>
                </a>
            </div>
        </section>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
    }),
    methods: {
		...mapActions(["getUsersList", "getBoardsList"]),
        closeDeleteBoard(value) {
            this.openDeleteBoard[value] = false
        },
        goToBoard(id) {
            this.$router.push({
                name: "Board",
                params: { boardId: id },
			});
        },
		getUserData() {
			this.users.forEach(el => {
				if (this.user.userId === el.userId) {
					this.$store.commit("setUser", el)
				}
			})
		}
    },
	computed: {
		...mapGetters(["users", "user", "boards"]),
	},
    async created() {
		await this.getUsersList();
		await this.getUserData();
        this.getBoardsList(this.user.id);
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
        }
        &--text {
            display: inline-block;
            color: #fff;
            font-weight: 500;
            font-size: 16px;
            margin: 10px 0 0 10px;
            transition: all 0.5s;
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

</style>
