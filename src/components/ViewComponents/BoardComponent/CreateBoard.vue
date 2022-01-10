<template>
    <v-menu v-model="menuCreateBoard" :close-on-content-click="false" :nudge-width="200" offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="btn__additional btn__dropdown" v-bind="attrs" v-on="on">Workspaces<v-icon class="icon__menu">{{ downArrow }}</v-icon></v-btn>
        </template>
        <v-card>
            <v-list>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="dropdown__text">Workspaces</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-btn icon small>
                            <v-icon @click="menuCreateBoard = false">mdi-close</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list>
                <v-list-item>
                    <v-list-item-title class="dropdown__text--title">Your workspaces</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <a href="/" class="btn__bitbucket">
                        <v-btn class="btn__bitbucket">  
                            <div class="icon__workspace--container">
                                <p class="icon__workspace--text">P</p>
                            </div>
                            <p class="btn__text--additional">Workspace Trello</p>
                        </v-btn>
                    </a>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title class="dropdown__text--title">Guest workspaces</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <a href="/" class="btn__bitbucket">
                        <v-btn class="btn__bitbucket">  
                            <div class="icon__workspace--container icon__workspace--second-container">
                                <p class="icon__workspace--text">T</p>
                            </div>
                            <p class="btn__text--additional">Guest Trello</p>
                        </v-btn>
                    </a>
                </v-list-item>
            </v-list>
        </v-card>
    </v-menu>
</template>

<script>
export default {
    name: "CreateBoard",
    data: () => ({
        menuCreateBoard: false,
    }),
    props: {
        menuCreateBoard: {
            type: Boolean,
            default: false,
        }
    },
}
</script>

<style>

</style>