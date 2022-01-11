<template>
    <v-card >
        <v-list>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title >Delete board?</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                    <v-btn icon small>
                        <v-icon @click="closeDeleteBoard">mdi-close</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
export default {
    name: "DeleteBoard",
    methods: {
        closeDeleteBoard() {
            this.$emit("closeDeleteBoard", false);
        },
    }
}
</script>

<style>

</style>