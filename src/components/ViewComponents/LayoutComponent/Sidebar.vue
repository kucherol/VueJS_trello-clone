<template>
    <div class="sidebar" :class="{'sidebar__show' : showSidebar}">
        <div class="control" :class="{'control__show' : showSidebar}">
            <div class="control__arrow" >
                <v-icon @click="openSidebar" class="control__arrow-icon">{{ arrowIcon }}</v-icon>
            </div>
        </div>
    </div>
</template>

<script>
import { mdiArrowRight } from '@mdi/js';
export default {
    name: "Sidebar",
    data: () => ({
        arrowIcon: mdiArrowRight,
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
        z-index: 999;
        transition: all 0.5s ease-in-out;
        height: 100vh;
        &__show {
            width: 20%;
            & div button {
                color: #fff !important;
                transform: rotate(180deg);
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
</style>