<template>
    <div>
        <v-col>
            <v-breadcrumbs large :items="items">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        </v-col>
    </div>
</template>

<script>
    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name: "Content",
        data: () => ({
            items: [
                {
                    text: 'Home',
                    disabled: false,
                    href: '/',
                },
                {
                    text: 'Calculator',
                    disabled: false,
                    href: '/calculator',
                },
            ],
        }),
    }
</script>

<style scoped>

</style>