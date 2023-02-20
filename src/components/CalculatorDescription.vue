<template>
    <div>
        <v-alert
                border="left"
                colored-border
                color="deep-purple accent-2"
                elevation="1"
        >
            <h1>Liner Calculator</h1>
            <h3>What Size Liner Do You Need?</h3>
            <p>
                User our calculator to find out how much pond liner material you need for your liner project. Enter the length, width and deepest depth of the proposed area into the fields below.
                <br>
                Please reference the diagram on how to take the correct measurements.
            </p>
        </v-alert>
        <p>
            <b>
                If you have an irregularly shaped area, for example a kidney shaped pond please <router-link to="/contact"><u>contact us</u></router-link> for an estimation of material needed.
            </b>
        </p>
    </div>
</template>

<script>
    export default {
        name: "CalculatorDescription"
    }
</script>

<style scoped>

</style>