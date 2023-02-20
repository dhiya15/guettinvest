<template>
    <div>
        <v-stepper v-model="e1" elevation="1" v-if="a === true && b === false">
            <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" :step="1">
                    Step 1
                </v-stepper-step>
                <v-stepper-step :complete="e1 > 2" :step="2">
                    Step 2
                </v-stepper-step>
                <v-stepper-step :complete="e1 > 3" :step="3">
                    Step 3
                </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content :step="1">
                    <div>
                        <v-text-field v-model="dimension[0]" label="Longeur /m"></v-text-field>
                        <v-text-field v-model="dimension[1]" label="Largeur /m"></v-text-field>
                        <v-text-field v-model="dimension[2]" label="Hauteur /m"></v-text-field>
                    </div>
                    <v-btn v-if="parseFloat(this.dimension[0]) > 0 && parseFloat(this.dimension[1]) > 0 && parseFloat(this.dimension[2]) > 0" color="primary" @click="nextStep(1)">Continue</v-btn>
                </v-stepper-content>
                <v-stepper-content :step="2">
                    <div>
                        <v-radio-group v-model="radioGroup">
                            <v-radio label="Géomembrane 1 mm" value="1mm"></v-radio>
                            <v-radio label="Géomembrane 1.5 mm" value="1.5mm"></v-radio>
                            <v-radio label="Géomembrane 2 mm" value="2mm"></v-radio>
                        </v-radio-group>
                        <v-checkbox v-if="water_holding_capacity_m3[1] > excavation_and_earthwork_limit" v-model="checkbox" label="Excavation et Terrassement"></v-checkbox>

                    </div>
                    <v-btn v-if="radioGroup != null" color="primary" @click="nextStep(2)">Continue</v-btn>
                    <v-btn text @click="previousStep(1)">Retour</v-btn>
                </v-stepper-content>
                <v-stepper-content :step="3">
                    <v-checkbox v-model="checkbox2" label="Avec cloture"></v-checkbox>
                    <v-radio-group v-model="radioGroup2" v-if="checkbox2 == true">
                        <v-radio label="Hauteur 1,2 m" value="1.2m"></v-radio>
                        <v-radio label="Hauteur 1,7 m" value="1.7m"></v-radio>
                        <v-radio label="Hauteur 2,2 m" value="2.2m"></v-radio>
                    </v-radio-group>
                    <v-btn color="primary" @click="calculate()">Valider</v-btn>
                    <v-btn text @click="previousStep(2)">Retour</v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>

        <div v-if="b === true && a === false">
            <v-alert shaped prominent type="info" outlined block>
                <h5>Votre bassin a été estimé par</h5>
                <h1>{{total}} DA</h1>
                <v-btn text color="primary" @click="back()"><u>Fait un autre calcule</u></v-btn>
            </v-alert>
        </div>

    </div>
</template>

<script>
    export default {
        name: "CalculatorSteps",
        data: () => ({
            total: 0,
            e1: 1,
            steps: 3,
            checkbox: false,
            radioGroup: "1mm",
            checkbox2: false,
            radioGroup2: "1.2m",
            a: true,
            b: false,
            dimension: [0, 0, 0],
            embankment: 0,
            internal_dimension: [0, 0],
            water_holding_capacity_m3: [0, 0, 0],
            geomembrane_area_m2: [0, 0, 0],
            area_m2: [
                {min: 100, max: 300, guettinvest: 90},
                {min: 301, max: 600, guettinvest: 75},
                {min: 601, max: 1000, guettinvest: 65},
                {min: 1001, max: 1500, guettinvest: 60},
                {min: 1501, max: 2000, guettinvest: 55},
                {min: 2001, max: 4000, guettinvest: 45},
                {min: 4001, max: 6000, guettinvest: 43},
                {min: 6001, max: 8000, guettinvest: 40},
                {min: 8001, max: 10000, guettinvest: 38},
                {min: 10001, max: 15000, guettinvest: 36},
                {min: 15001, max: 20000, guettinvest: 35},
                {min: 20001, max: 30000, guettinvest: 34},
                {min: 30001, max: 99999999999, guettinvest: 33}
            ],
            area_m2_all: [
                {min: 100, max: 300, price_1_mm: 0, total_1_mm: 0, price_1_5_mm: 0, total_1_5_mm: 0, price_2_mm: 0, total_2_mm: 0},
                {min: 301, max: 600, price_1_mm: 0, total_1_mm: 0, price_1_5_mm: 0, total_1_5_mm: 0, price_2_mm: 0, total_2_mm: 0},
                {min: 601, max: 1000, price_1_mm: 0, total_1_mm: 0, price_1_5_mm: 0, total_1_5_mm: 0, price_2_mm: 0, total_2_mm: 0},
                {min: 1001, max: 1500, price_1_mm: 0, total_1_mm: 0, price_1_5_mm: 0, total_1_5_mm: 0, price_2_mm: 0, total_2_mm: 0},
                {min: 1501, max: 2000, price_1_mm: 0, total_1_mm: 0, price_1_5_mm: 0, total_1_5_mm: 0, price_2_mm: 0, total_2_mm: 0},
                {min: 2001, max: 4000, price_1_mm: 0, total_1_mm: 0, price_1_5_mm: 0, total_1_5_mm: 0, price_2_mm: 0, total_2_mm: 0},
                {min: 4001, max: 6000, price_1_mm: 0, total_1_mm: 0, price_1_5_mm: 0, total_1_5_mm: 0, price_2_mm: 0, total_2_mm: 0},
                {min: 6001, max: 8000, price_1_mm: 0, total_1_mm: 0, price_1_5_mm: 0, total_1_5_mm: 0, price_2_mm: 0, total_2_mm: 0},
                {min: 8001, max: 10000, price_1_mm: 0, total_1_mm: 0, price_1_5_mm: 0, total_1_5_mm: 0, price_2_mm: 0, total_2_mm: 0},
                {min: 10001, max: 15000, price_1_mm: 0, total_1_mm: 0, price_1_5_mm: 0, total_1_5_mm: 0, price_2_mm: 0, total_2_mm: 0},
                {min: 15001, max: 20000, price_1_mm: 0, total_1_mm: 0, price_1_5_mm: 0, total_1_5_mm: 0, price_2_mm: 0, total_2_mm: 0},
                {min: 20001, max: 30000, price_1_mm: 0, total_1_mm: 0, price_1_5_mm: 0, total_1_5_mm: 0, price_2_mm: 0, total_2_mm: 0},
                {min: 30001, max: 99999999999, price_1_mm: 0, total_1_mm: 0, price_1_5_mm: 0, total_1_5_mm: 0, price_2_mm: 0, total_2_mm: 0}
            ],
            // variant 01
            geomembrane_price: [
                {key: "1mm", price: 400},
                {key: "1.5mm", price: 560},
                {key: "2mm", price: 760}
            ],
            // variant 02
            installation_price: [
                {min: 100, max: 300, price: 180},
                {min: 301, max: 600, price: 150},
                {min: 601, max: 1000, price: 130},
                {min: 1001, max: 1500, price: 120},
                {min: 1501, max: 2000, price: 110},
                {min: 2001, max: 4000, price: 90},
                {min: 4001, max: 6000, price: 86},
                {min: 6001, max: 8000, price: 80},
                {min: 8001, max: 10000, price: 76},
                {min: 10001, max: 15000, price: 72},
                {min: 15001, max: 20000, price: 65},
                {min: 20001, max: 30001, price: 64},
                {min: 30001, max: 99999999999, price: 63}
            ],
            excavation_and_earthwork_limit: 1000,
            // variant 03
            excavation_and_earthwork: [
                {min: 1001, max: 5000, price: 250, total: 0},
                {min: 5001, max: 10000, price: 230, total: 0},
                {min: 10001, max: 15000, price: 200, total: 0},
                {min: 15001, max: 20000, price: 180, total: 0},
                {min: 20001, max: 25000, price: 150, total: 0},
                {min: 25001, max: 30000, price: 130, total: 0},
                {min: 30001, max: 40000, price: 120, total: 0},
                {min: 40001, max: 50000, price: 110, total: 0},
                {min: 50001, max: 60000, price: 100, total: 0},
                {min: 60001, max: 99999999999, price: 80, total: 0}
            ],
            // variant 04
            closing_price: [
                {key: "1.2m", price: 2600, total: 0},
                {key: "1.7m", price: 2900, total: 0},
                {key: "2.2m", price: 3300, total: 0},
                // {key: "1.2m", price: 1500, total: 0},
                // {key: "1.7m", price: 1800, total: 0},
                // {key: "2.2m", price: 2200, total: 0},
            ],
        }),
        methods: {
            nextStep (n) {
                if (n === this.steps) {
                    this.e1 = 1
                } else {
                    this.e1 = n + 1
                }
                if(n === 1) {
                    this.stepNumber1()
                }
            },
            previousStep (n) {
                if (n === 0) {
                    return
                } else {
                    this.e1 = n
                }
            },
            calculate () {


                var val1 = 0
                for(var i=0; i<this.geomembrane_price.length; i++){
                    if(this.geomembrane_price[i].key === this.radioGroup){
                        val1 = this.geomembrane_price[i].price
                        break
                    }
                }

                var val2 = 0
                for(i=0; i<this.installation_price.length; i++){
                    if(this.geomembrane_area_m2[2] >= this.installation_price[i].min && this.geomembrane_area_m2[2] <= this.installation_price[i].max){
                        val2 = this.installation_price[i].price
                        break
                    }
                }

                var val3 = 0
                if(this.water_holding_capacity_m3[1] > this.excavation_and_earthwork_limit && this.checkbox === true){
                    for(i=0; i<this.excavation_and_earthwork.length; i++){
                        if(this.water_holding_capacity_m3[1] >= this.excavation_and_earthwork[i].min &&
                            this.water_holding_capacity_m3[1] <= this.excavation_and_earthwork[i].max){
                            val3 = this.excavation_and_earthwork[i].total
                            break
                        }
                    }
                }

                var val4 = 0
                if(this.checkbox2 === true) {
                    for (i = 0; i < this.closing_price.length; i++) {
                        if (this.closing_price[i].key === this.radioGroup2) {
                            val4 = this.closing_price[i].total
                            break
                        }
                    }
                }

                this.total = val3 + ((val1 + val2) * this.geomembrane_area_m2[2]) + val4

                this.total = (Math.round(this.total * 100)/100).toFixed(2);

                this.b = true
                this.a = false
            },
            back() {
                this.a = true
                this.b = false
                this.e1 = 1
            },
            stepNumber1() {
                this.internal_dimension[0] = parseFloat(this.dimension[0]) - ((parseFloat(this.dimension[2]) / 1.73) * 2)
                this.internal_dimension[1] = parseFloat(this.dimension[1]) - ((parseFloat(this.dimension[2]) / 1.73) * 2)

                this.embankment = parseFloat(this.dimension[2]) / 0.766

                this.water_holding_capacity_m3[0] = parseFloat(this.dimension[0]) * parseFloat(this.dimension[1]) * parseFloat(this.dimension[2]) * 0.7
                this.water_holding_capacity_m3[1] = parseFloat(this.dimension[0]) * parseFloat(this.dimension[1]) * parseFloat(this.dimension[2])
                this.water_holding_capacity_m3[2] = ((parseFloat(this.water_holding_capacity_m3[0]) + this.water_holding_capacity_m3[1]) / 2) * 0.9

                this.geomembrane_area_m2[0] = ((parseFloat(this.dimension[0]) + parseFloat(this.dimension[1])) * 2 * (parseFloat(this.dimension[2]) + 2)) + (parseFloat(this.dimension[0]) * parseFloat(this.dimension[1]))

                this.geomembrane_area_m2[1] = ((parseFloat(this.dimension[0]) + parseFloat(this.dimension[1])) * 2 * (parseFloat(this.embankment) + 2)) + (parseFloat(this.internal_dimension[0]) * parseFloat(this.internal_dimension[1]))
                this.geomembrane_area_m2[2] = (parseFloat(this.geomembrane_area_m2[0]) + parseFloat(this.geomembrane_area_m2[1])) / 2

                for(var i=0; i<this.excavation_and_earthwork.length; i++) {
                    this.excavation_and_earthwork[i].total = parseFloat(this.excavation_and_earthwork[i].price) * parseFloat(this.water_holding_capacity_m3[1])
                }

                for(i=0; i<this.closing_price.length; i++) {
                    this.closing_price[i].total = ((parseFloat(this.dimension[0]) + parseFloat(this.dimension[1]) + 16) * 2) * parseFloat(this.closing_price[i].price)
                }

                for(i=0; i<this.area_m2_all.length; i++) {
                    this.area_m2_all[i].price_1_mm = parseFloat(this.geomembrane_price[0].price) + parseFloat(this.installation_price[i].price)
                    this.area_m2_all[i].total_1_mm = parseFloat(this.area_m2_all[i].price_1_mm) * parseFloat(this.geomembrane_area_m2[2])

                    this.area_m2_all[i].price_1_5_mm = parseFloat(this.geomembrane_price[1].price) + parseFloat(this.installation_price[i].price)
                    this.area_m2_all[i].total_1_5_mm = parseFloat(this.area_m2_all[i].price_1_5_mm) * parseFloat(this.geomembrane_area_m2[2])

                    this.area_m2_all[i].price_2_mm = parseFloat(this.geomembrane_price[2].price) + parseFloat(this.installation_price[i].price)
                    this.area_m2_all[i].total_2_mm = parseFloat(this.area_m2_all[i].price_2_mm) * parseFloat(this.geomembrane_area_m2[2])
                }
            }
        },
    }
</script>

<style scoped>

</style>