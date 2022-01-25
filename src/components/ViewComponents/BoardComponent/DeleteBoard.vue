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
                    <v-btn icon large @click="deleteBoard">
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
        deleteBoard() {
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
	}
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
