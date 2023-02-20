<template>
    <div class="all">
        <Header/>
        <Hero/>
        <v-container style="margin-top: 35px">
            <Breadcrumb/>
            <CalculatorDescription/>
            <CalculatorSteps/>
        </v-container>
        <Footer style="margin-top: 30px"/>
        <v-overlay :value="overlay" color="white" :opacity="1">
            <v-progress-circular
                    indeterminate
                    size="60"
                    color="#1D8BE1"
            ></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script >
    import Header from '../components/Header';
    import Hero from '../components/Hero';
    import Breadcrumb from "../components/Breadcrumb";
    import CalculatorDescription from "../components/CalculatorDescription";
    import CalculatorSteps from "../components/CalculatorSteps";
    import Footer from "@/components/Footer";

    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name: 'Home',
        components: {
            Footer,
            Header,
            Hero,
            Breadcrumb,
            CalculatorDescription,
            CalculatorSteps
        },
        data: () => ({
            isHidden: true,
            overlay: false,
        }),
        created () {
            window.addEventListener('scroll', this.handleScroll)
        },
        destroyed () {
            window.removeEventListener('scroll', this.handleScroll)
        },
        mounted() {
            document.title = 'Home'
        },
        methods: {
            handleScroll () {
                if(window.scrollY > 100){
                    this.isHidden = false
                }else{
                    this.isHidden = true
                }
            },
        },
    }
</script>


<style>
    html {
        scroll-behavior: smooth;
    }
</style>


