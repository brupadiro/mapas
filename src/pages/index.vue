<template>
    <v-container fluid>
        <v-row no-gutters>
            <v-col class="col-12 mb-12">
                <h1 class="text-center text-lg-h3 font-weight-bold">Cada año, nuestros socios atraen y<br> facilitan miles
                    de rodajes en nuestro país.</h1>
                <h4 class="text-center">Gracias a su labor te presentamos los mejores destinos de pantalla a los que
                    viajar</h4>
            </v-col>
            <v-col class="col-12 col-md-5 col-lg-6 d-flex justify-center">
                <v-fade-transition>
                    <v-card  v-ripple dark elevation="6" class="rounded-xl info-card" v-show="locSelected.name">
                        <a href="#">
                            <v-card-title class="d-flex justify-center font-weight-bold">
                            {{ locSelected.name }}
                        </v-card-title>
                    </a>
                        <v-img :src="locSelected.img" cover height="250" class="image-location" width="100%">
                        </v-img>
                        <v-card-text class="white--text px-lg-12 font-weight-bold">
                            {{ locSelected.description }}
                        </v-card-text>
                    </v-card>

                </v-fade-transition>
            </v-col>
            <v-col class="col-12 col-md-6 col-lg-6 pr-lg-16">
                <svgMapComponent>
                    <template v-for="(loc,index) in baseLocs">
                        <pointComponent @mouseover.native="locSelected = loc" v-if="locSelected.name !=loc.name" :loc="loc" :key="index"></pointComponent>
                        <waveComponent v-else :loc="loc" :key="index"></waveComponent>
                    </template>
                </svgMapComponent>
            </v-col>
            <v-col class="col-md-1"></v-col>
       </v-row>

    </v-container>
</template>
<script>
    import waveComponent from '@/components/waveComponent.vue'
    import svgMapComponent from '@/components/svgMapComponent.vue'
    import pointComponent from '@/components/pointComponent.vue'
    import {
        latLng
    } from 'leaflet';
    const L = require('leaflet');

    import baseLocs from '@/assets/base_locs.json'
    import spainJson from '@/assets/spain.json'
    import franceJson from '@/assets/france.json'
    import africaJson from '@/assets/africa.json'
    import portugalJson from '@/assets/portugal.json'
    import InlineSvg from 'vue-inline-svg';
    import * as d3 from 'd3';

    export default {
        components: {
            InlineSvg,
            waveComponent: waveComponent,
            pointComponent: pointComponent,
            svgMapComponent: svgMapComponent
        },
        name: 'IndexPage',
        data() {
            return {
                spainJson: spainJson,
                franceJson: franceJson,
                africaJson: africaJson,
                portugalJson: portugalJson,
                locSelected: {},
                baseLocs: baseLocs,
                latLng: latLng,
                myPosition: {
                    lat: -30,
                    lng: -3.5,
                },
                styleJson: {
                    color: "#258dc8",
                    weight: 0,
                    opacity: 1,
                    fillOpacity: 0.4
                },
                styleCanaryJson: {
                    color: "white",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 1
                },


                optionsCanaryMap: {
                    zoomSnap: 0.25,
                    minZoom: 7,
                    maxZoom: 7,
                    dragging: false,
                    zoomControl: false

                },
                mapZoom: 5.4,

                url: 'https://tile.jawg.io/1c5dd981-0cb2-41e3-a0fa-f7d6e1e4a826/{z}/{x}/{y}{r}.png?access-token=8ArpEoBiGS2zZwlKLqdLxbmdF8KnbQQdctZ4DoDLDk5fAU8hr3ava9MJaJ74PLTG&f=12'
            }
        },
        async mounted() {
            this.checkMap();

        },

        updated() {
            this.checkMap();
        },
        methods: {
            checkMap() {
                if (this.$refs.map) {
                    this.centrarEnEspana();
                }
            },
            centrarEnEspana() {
                this.$refs.map.mapObject.setView([39.7, -7.5]);
            },

        },
    }
</script>

<style lang="scss">
    .canarymap {
        height: 200px;
        position: absolute;
        z-index: 10000;
        bottom: 0px;
        width: 50% !important;
        border: 1px solid black;

    }

    @media(max-width:768px) {
        .canarymap {
            width: 100% !important;
        }
    }
    .info-card{
        max-width:50%!important;
    }
    @media(max-width:1200px) {
        .info-card {
            max-width:70%!important;;
        }
    }
    @media(max-width:900px) {
        .info-card {
            max-width:100%!important;;
        }
    }
    @media (min-width: 1600px) {
        .image-location {
            height:350px!important;
        }
    }
        
</style>