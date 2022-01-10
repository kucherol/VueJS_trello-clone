<template>
    <div class="Boards">
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
                <a href="/" v-for="(board, key) in boards" :key="key" class="board-card">
                    <p class="board-card--text">{{ board.title }}</p>
                </a>
            </div>
        </section> 
    </div>
</template>

<script>
import firebase from "../firebase.js";
import { mdiClockOutline } from '@mdi/js';
export default {
    name: "Boards",
    data: () => ({
        clockIcon: mdiClockOutline,
        boards: [ ],
        ref: firebase.firestore().collection('boards'),
    }),
    created() {
        this.ref.onSnapshot((snapshotChange) => {
            this.boards = [];
            snapshotChange.forEach((doc) => {
                this.boards.push({
                    key: doc.id,
                    title: doc.data().title,
                })
            })
        })
    },
}
</script>

<style lang="scss" scoped>
    .boards {
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
        background-color: #0747a6;
        height: 150px;
        width: 200px;
        border-radius: 5px;
        margin: auto;
        &:hover {
            background-color: rgba($color: #0747a6, $alpha: 0.8);
        }
        &--text {
            display: inline-block;
            color: #fff;
            font-weight: 500;
            font-size: 16px;
            margin: 10px 0 0 10px;
        }
    }

    p {
        margin-bottom: 0;
    }

</style>