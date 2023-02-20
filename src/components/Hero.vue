<template>
    <v-col class="hero">
        <v-row justify="center" align="center" align-content="center">
            <img src="../assets/logo.png" height="48" alt="Logo" class="mt-1"/>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-list class="d-flex align-center" style="background-color: transparent">
                    <a style="text-decoration: none" :href="menu.id" v-for="(menu, index) in menus" :key="index">
                        <v-list-item  link>
                            <v-list-item-title>Home</v-list-item-title>
                        </v-list-item>
                    </a>
                    <v-list-item  link to="/magazine">
                        <v-list-item-title>Products</v-list-item-title>
                    </v-list-item>
                    <v-list-item  link to="/channel">
                        <v-list-item-title>Application</v-list-item-title>
                    </v-list-item>
                    <v-list-item  link to="/contact">
                        <v-list-item-title>Case study</v-list-item-title>
                    </v-list-item>
                    <v-list-item  link to="/contact">
                        <v-list-item-title>Calculator</v-list-item-title>
                    </v-list-item>
                    <v-list-item  link to="/contact">
                        <v-list-item-title>About US</v-list-item-title>
                    </v-list-item>
                    <v-list-item  link to="/contact">
                        <v-list-item-title>Contact US</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-toolbar-items>
            <div class="hidden-md-and-up">
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on">
                            <v-icon>mdi-menu</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <a style="text-decoration: none" :href="menu.id" v-for="(menu, index) in menus" :key="index">
                            <v-list-item  link>
                                <v-list-item-title>Home</v-list-item-title>
                            </v-list-item>
                        </a>
                        <v-list-item  link to="/magazine">
                            <v-list-item-title>Products</v-list-item-title>
                        </v-list-item>
                        <v-list-item  link to="/channel">
                            <v-list-item-title>Application</v-list-item-title>
                        </v-list-item>
                        <v-list-item  link to="/contact">
                            <v-list-item-title>Case study</v-list-item-title>
                        </v-list-item>
                        <v-list-item  link to="/contact">
                            <v-list-item-title>Calculator</v-list-item-title>
                        </v-list-item>
                        <v-list-item  link to="/contact">
                            <v-list-item-title>About US</v-list-item-title>
                        </v-list-item>
                        <v-list-item  link to="/contact">
                            <v-list-item-title>Contact US</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </v-row>
        <v-row class="hero">

        </v-row>
    </v-col>
</template>

<script>
    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name: "Hero",
        props:{
            magasin: Object
        },
        data: () => ({
            menus: [
                {id: "/", title: "Home", route:"/"}
            ]
        })
    }
</script>

<style scoped>
    .hero {
        background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../assets/cover.jpg");
        height: 629px;
        width: 1920px;
    }
</style>