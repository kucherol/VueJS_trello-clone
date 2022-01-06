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
                <li class="sidebar__list-item board">
                    <div class="board__icon">
                        <v-icon class="board__icon--trello">{{ trelloIcon }}</v-icon>
                    </div>
                    <div class="board__text">
                        <p class="workspace__text--title board__text--item">Boards</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mdiArrowRight, mdiTrello } from '@mdi/js';
export default {
    name: "Sidebar",
    data: () => ({
        arrowIcon: mdiArrowRight,
        trelloIcon: mdiTrello,
        showSidebar: false,
    }),
    methods: {
        openSidebar() {
            this.showSidebar = !this.showSidebar;
        }
    }
}
</script>

<style lang="scss" scoped>
    .sidebar {
        position: absolute;
        left: 0;
        top: 48px;
        width: 2%;
        padding: 10px;
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

    p {
        margin-bottom: 0 !important;
    }
</style>