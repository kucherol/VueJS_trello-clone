<template>
    <div class="sidebar" :class="[{'sidebar__show' : showSidebar}, {'sidebar__hover' : !showSidebar}]">
        <div class="control" :class="{'control__show' : showSidebar}">
            <div class="control__arrow" >
                <v-icon @click="openSidebar" class="control__arrow-icon">{{ arrowIcon }}</v-icon>
            </div>
        </div>
        <div v-if="showSidebar">
            <ul class="sidebar__list">
                <li class="sidebar__list-item">
                    <a href="" class="workspace__link">
                        <div class="workspace">
                            <div class="workspace__icon--container">
                                <p class="workspace__icon">W</p>
                            </div>
                            <div class="workspace__text">
                                <p class="workspace__text--title">Workspace Trello</p>
                                <p class="workspace__text--subtitle">Free</p>
                            </div>
                        </div>
                    </a>
                </li>
                <v-divider></v-divider>
                <a href="" class="workspace__link">
                    <li class="sidebar__list-item board">
                        <div class="board__icon">
                            <v-icon class="board__icon--trello">{{ trelloIcon }}</v-icon>
                        </div>
                        <div class="board__text">
                            <p class="workspace__text--title board__text--item">Boards</p>
                        </div>
                    </li>
                </a>
                <a class="workspace__link" @click.prevent="goToUsers">
                    <li class="sidebar__list-item board">
                        <div class="board__icon">
                            <v-icon class="board__icon--trello">{{ peopleIcon }}</v-icon>
                        </div>
                        <div class="board__text">
                            <p class="workspace__text--title board__text--item">Members</p>
                        </div>
                    </li>
                </a>
                <a href="" class="workspace__link">
                    <li class="sidebar__list-item board">
                        <div class="board__icon">
                            <v-icon class="board__icon--trello">{{ settingsIcon }}</v-icon>
                        </div>
                        <div class="board__text">
                            <p class="workspace__text--title board__text--item">Settings</p>
                        </div>
                    </li>
                </a>
                <v-divider></v-divider>
                <li class="sidebar__list-item sidebar__subtitle">
                    <p class="sidebar__subtitle--text">Your boards</p>
                    <v-menu v-model="openCreateBoard" :close-on-content-click="false" :nudge-width="80" offset-y>
                        <template v-slot:activator="{ on, attrs }" >
                            <v-btn class="sidebar__board--add" v-bind="attrs" v-on="on">
                                <v-icon class="board__icon--trello">{{ plusIcon }}</v-icon>
                            </v-btn>
                        </template>
                        <create-board @closeCreateBoard="closeCreateBoard" />
                    </v-menu>
                </li>
                <a v-for="(board, id) in boards" :key="id" class="workspace__link" @click.prevent="goToBoard(board.id)">
                    <li class="sidebar__list-item board">
                        <div class="board__img" :class="board.color">
                            <p class="board__img--text">{{ board.title.charAt(0) }}</p>
                        </div>
                        <div class="board__text">
                            <p class="workspace__text--title board__text--item">{{ board.title }}</p>
                        </div>
                    </li>
                </a>
            </ul>
        </div>
    </div>
</template>

<script>
import firebase from "../../../firebase.js";
import CreateBoard from "../BoardComponent/CreateBoard.vue";
import { mdiArrowRight, mdiTrello, mdiAccountGroupOutline, mdiCog, mdiPlus } from '@mdi/js';
export default {
    name: "Sidebar",
    components: {
        CreateBoard,
    },
    data: () => ({
        arrowIcon: mdiArrowRight,
        trelloIcon: mdiTrello,
        peopleIcon: mdiAccountGroupOutline,
        settingsIcon: mdiCog,
        plusIcon: mdiPlus,
        showSidebar: true,
        openCreateBoard: false,
        boards: [ ],
        ref: firebase.firestore().collection("users"),
    }),
    methods: {
        openSidebar() {
            this.showSidebar = !this.showSidebar;
            this.$emit("openSidebar", this.showSidebar);
        },
        closeCreateBoard(value) {
            this.openCreateBoard = value;
        },
		goToBoard(id) {
            this.$router.push({
                name: "Board",
                params: { boardId: id },
			});
        },
		goToUsers() {
			this.$router.push({
                name: "Members",
			});
		}
    },
    created() {
        this.ref.doc(this.$route.params.dashboardId).collection("boards").onSnapshot((snapshotChange) => {
            this.boards = [];
            snapshotChange.forEach((doc) => {
                this.boards.push({
                    key: doc.id,
                    title: doc.data().title,
                    color: doc.data().color,
                })
            })
        })
    },
}
</script>

<style lang="scss" scoped>
    .sidebar {
        position: absolute;
        left: 0;
        width: 2%;
        padding: 58px 0 0 0;
        min-height: calc(100vh-20px);
        border: 1px solid #fff;
        background-color: #026AA7;
        border-width: 0 1px 0 0;
        z-index: 1;
        transition: all 0.5s ease-in-out;
        height: 100vh;
        &__show {
            width: 20%;
            & div button {
                color: #fff !important;
                transform: rotate(180deg);
            }
        }
        &__hover:hover {
            &:hover {
                background-color: rgba($color: #026AA7, $alpha: 0.8);
            }
        }
        &__list {
            list-style-type: none;
            &-item {
                margin-bottom: 5px;
                padding: 5px;
            }
        }
        &__subtitle {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            &--text {
                color: #fff;
                font-size: 16px;
            }
        }
        &__board {
            &--add {
                background-color: #026AA7 !important;
                height: 30px !important;
                min-width: 30px !important;
                padding: 0 !important;
                box-shadow: none !important;
                &:hover {
                    background-color: rgba($color: #fff, $alpha: 0.3);
                }
            }
        }
    }

    .control {
        position: absolute;
        right: -15px;
        &__arrow {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            margin-bottom: 10px;
            border: 1px solid #fff;
            border-radius: 50%;
            background-color: #026AA7;
            &-icon {
                color: #fff;
            }
        }
        &__show {
            position: absolute;
            right: -15px;
            transition: all 0.5s ease-in-out;
        }
    }

    .workspace {
        width: 90%;
        display: flex;
        margin-top: 10px;
        padding: 5px;
        transition: 0.5s;
        border-radius: 4px;
        &:hover {
            background-color: rgba($color: #fff, $alpha: 0.2);
        }
        &__link {
            text-decoration: none;
            color: #fff;
        }
        &__icon {
            font-size: 16px;
            &--container {
                width: 35px;
                height: 35px;
                background: linear-gradient(#403294, #0747a6);
                border-radius: 4px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        &__text {
            display: flex;
            flex-direction: column;
            margin-left: 15px;
            &--title {
                font-size: 14px;
            }
            &--subtitle {
                font-size: 12px;
            }
        }
    }

    .board {
        width: 90%;
        flex-direction: row;
        margin-top: 10px;
        padding: 5px;
        transition: 0.5s;
        border-radius: 4px;
        display: flex;
        &:hover {
            background-color: rgba($color: #fff, $alpha: 0.2);
        }
        &__icon {
            margin-right: 10px;
            &--trello {
                color: #fff;
            }
        }
        &__text {
            display: flex;
            justify-content: center;
            align-items: center;
            &--item {
                color: #fff;
            }
        }
        &__img {
            margin-right: 10px;
            width: 25px;
            height: 25px;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            &--text {
                color: #fff;
            }
        }
    }

    p {
        margin-bottom: 0 !important;
    }
</style>
