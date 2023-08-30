<template>
    <v-container>
        <v-row>
            <v-col class="col-12 mb-12">
                <h1 class="text-center text-h3 font-weight-bold">Cada año, nuestros socios atraen y<br> facilitan miles de rodajes en nuestro país.</h1>
                <h4 class="text-center">Gracias a su labor te presentamos los mejores destinos de pantalla a los que viajar</h4>
            </v-col>
            <v-col class="col-12 col-md-5">
                <v-fade-transition>
                    <v-card dark elevation="6" class="rounded-xl" v-show="locSelected.name">
                    <v-card-title class="d-flex justify-center font-weight-bold">
                        {{ locSelected.name }}
                        <v-spacer></v-spacer>
                        <v-btn icon @click="locSelected = {}">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
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
                <l-map ref="map" draggable="false" :center="latLng(28,-15.5)" :zoom="mapZoom" :options="options" style="height:650px">
                    <l-geo-json :geojson="spainJson" :optionsStyle="styleJson"></l-geo-json>
                    <l-tile-layer :url="url" />
                    <div v-for="loc in baseLocs" :key="loc.name">
                        <l-marker 
                        @mouseover="locSelected = loc" 
                        :zIndexOffset="10000" :lat-lng="latLng(loc.lat, loc.lng)">
                            <l-icon :icon-size="[70, 70]">
                                <pointComponent v-show="locSelected.name != loc.name"></pointComponent>
                                <waveComponent v-show="locSelected.name == loc.name"></waveComponent>
                            </l-icon>
                        </l-marker>
                    </div>
                    <l-map ref="canarymap" class="canarymap" draggable="false" :options="optionsCanaryMap" :center="latLng(28.5,-15.5)" :zoom="7" style="height:200px;width:100%">
                    <l-geo-json :geojson="spainJson" :optionsStyle="styleJson"></l-geo-json>
     <l-geo-json :geojson="africaJson" :optionsStyle="styleCanaryJson"></l-geo-json>
    <l-tile-layer :url="url" />
                </l-map>

                    
                </l-map>

            </v-col>
        </v-row>

    </v-container>
</template>
<script>
    import waveComponent from '@/components/waveComponent.vue'
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
    export default {
        components: {
            waveComponent: waveComponent,
            pointComponent: pointComponent
        },
        name: 'IndexPage',
        data() {
            return {
                spainJson:spainJson,
                franceJson:franceJson,
                africaJson:africaJson,
                portugalJson:portugalJson,
                locSelected:{},
                baseLocs: baseLocs,
                latLng: latLng,
                myPosition: {
                    lat: -30,
                    lng: -3.5,
                },
                styleJson:{
                    color: "#258dc8",
                    weight: 0,
                    opacity: 1,
                    fillOpacity: 0.4
                },
                styleCanaryJson:{
                    color: "white",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 1
                },


                optionsCanaryMap:{
                    zoomSnap: 0.25,
                    minZoom: 7,
                    maxZoom: 7,
                    dragging: false,
                    zoomControl: false

                },
                mapZoom:6,

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
        computed:{
            options() {
                var optionsMap = {
                    zoomSnap: 0.25,
                    zoomControl: false,
                    scrollWheelZoom: false,
                    dragging:false,
                    zoom:10
          
                }
                if (this.$vuetify.breakpoint.xs) {
                    optionsMap.dragging = true
                    optionsMap.scrollWheelZoom = true
                    this.mapZoom=5


                } else if (this.$vuetify.breakpoint.sm) {
                } 
                return optionsMap
            }
        }
    }
</script>

<style lang="scss">
.canarymap{
    height: 200px;
    position: absolute;
    z-index: 10000;
    bottom: 0px;
    width: 50%!important;
    border: 1px solid black;

}
@media(max-width:768px){
    .canarymap{
        width: 100%!important;
    }
}
</style>