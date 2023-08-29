<template>
    <v-container>
        <v-row>
            <v-col class="col-12">
                <h1 class="text-center text-h3 font-weight-bold">Cada año, nuestros socios atraen y<br> facilitan miles de rodajes en nuestro país.</h1>
                <h4 class="text-center">Gracias a su labor te presentamos los mejores destinos de pantalla a los que viajar</h4>
            </v-col>
            <v-col class="col-12 col-md-5">
                <v-fade-transition>
                    <v-card dark elevation="6" class="rounded-xl" v-show="locSelected.name">
                    <v-card-title class="d-flex justify-center font-weight-bold">
                        {{ locSelected.name }}
                    </v-card-title>
                    <v-img :src="locSelected.img" cover height="300" width="100%">
                    </v-img>
                    <v-card-text class="white--text px-12">
                        {{ locSelected.description }}
                    </v-card-text>
                </v-card>

                </v-fade-transition>
            </v-col>
            <v-col class="col-12 col-md-7">
                <l-map ref="map" draggable="false" :options="options" style="height:500px">
                    <l-tile-layer :url="url" />
                    <div v-for="loc in baseLocs" :key="loc.name">
                        <l-marker 
                        @mouseover="locSelected = loc" 
                        @mouseleave="locSelected = {}" 
                        :zIndexOffset="10000" :lat-lng="latLng(loc.lat, loc.lng)">
                            <l-icon :icon-size="[70, 70]">
                                <pointComponent v-show="locSelected.name != loc.name"></pointComponent>
                                <waveComponent v-show="locSelected.name == loc.name"></waveComponent>
                            </l-icon>
                        </l-marker>
                    </div>


                </l-map>

            </v-col>
        </v-row>

    </v-container>
</template>
<script>
    const L = require('leaflet');
    import waveComponent from '@/components/waveComponent.vue'
    import pointComponent from '@/components/pointComponent.vue'
    import {
        latLng
    } from 'leaflet';

    import baseLocs from '@/assets/base_locs.json'
    export default {
        components: {
            waveComponent: waveComponent,
            pointComponent: pointComponent
        },
        name: 'IndexPage',
        data() {
            return {
                locSelected:{},
                baseLocs: baseLocs,
                latLng: latLng,
                myPosition: {
                    lat: 40,
                    lng: -3.5,
                },

                url: 'https://tile.jawg.io/1c5dd981-0cb2-41e3-a0fa-f7d6e1e4a826/{z}/{x}/{y}{r}.png?access-token=8ArpEoBiGS2zZwlKLqdLxbmdF8KnbQQdctZ4DoDLDk5fAU8hr3ava9MJaJ74PLTG&f=12'
            }
        },
        mounted() {
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
                this.$refs.map.mapObject.setView([40, -3.5], 6);
            },

        },
        computed:{
            options() {
                var optionsMap = {
                    zoomSnap: 0.25,
                    minZoom: 6,
                    dragging: false,
                    zoomControl: false
          
                }
                if (this.$vuetify.breakpoint.xs) {
                    optionsMap.maxZoom = 12;
                } else if (this.$vuetify.breakpoint.sm) {
                    optionsMap.maxZoom = 10;
                } else {
                    optionsMap.maxZoom = 6;
                } 
                return optionsMap
            }
        }
    }
</script>

<style lang="scss">
</style>