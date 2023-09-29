<template>
    <div>
        <v-row no-gutters>

            <v-col class="col-12">
                <v-card elevation="6" class="rounded-lg rounded-tl-0 rounded-bl-0 card" style="z-index:1000" v-if="!isPc">
                    <v-card-text>
                        <v-row>
                            <v-col class="col-12">
                                <selectComponent rounded v-model="search.Formato" label="Formato"
                                    :items="['Película','Serie',{value:'',text:'Peliculas y Series'}]">
                                </selectComponent>
                            </v-col>

                            <v-col class="col-12 pa-1">
                                    <v-autocomplete dense hide-details rounded v-model="search.Titulo"
                                        label="Títulos" :items="listOfTitles" outlined></v-autocomplete>
                                </v-col>
                                <v-col class="col-12 pa-1">
                                    <v-autocomplete dense hide-details rounded v-model="search.Director"
                                        label="Todas los Directores" :items="listOFDirectors" outlined></v-autocomplete>
                                </v-col>
                                <v-col class="col-12 pa-1">
                                    <v-autocomplete dense hide-details rounded v-model="search.Productora"
                                        label="Todas las Productoras" :items="listOFProducers" outlined></v-autocomplete>
                                </v-col>
                            <v-col class="col-12">
                                <v-input class="range-slider" hide-details>
                                    <template v-slot:prepend>
                                        <span class="mt-1">1933</span>
                                    </template>
                                    <template v-slot:append>
                                        <span class="mt-1">2023</span>
                                    </template>
                                    <v-slider min="1933" max="2023" hide-details v-model="search.Ano"
                                        thumb-color="#00bcd4"></v-slider>
                                </v-input>
                            </v-col>

                            <v-col class="col-12 text-center">
                                <h2 class="mb-0 canela-font">Distribucion especial de los rodajes</h2>
                            </v-col>
                            <v-col class="col-12">

                                <v-autocomplete dense hide-details rounded v-model="search.Comunidad_autonoma"
                                    label="Comunidad autonoma" :items="listOFComunitys" outlined></v-autocomplete>
                            </v-col>
                            <v-col class="col-6">
                                <v-autocomplete dense hide-details rounded v-model="search.Provincia"
                                    label="Provincia" :items="listOFProvinces" outlined></v-autocomplete>
                            </v-col>
                            <v-col class="col-6">
                                <v-autocomplete dense hide-details rounded v-model="search.Municipio"
                                    label="Municipio" :items="listOFMuniciples" outlined></v-autocomplete>

                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>


            </v-col>


            <v-col class="col-md-12">
                <l-map ref="map" draggable="false" :center="latLng(center)" :zoom="zoom" style="height:100vh"
                    class="d-flex align-center">
                    <l-tile-layer :url="url" />
                    <v-marker-cluster>
                        <l-marker v-for="(loc,index) in locationFilter" @click="selected = loc"
                            :key="loc.ID_película+index" :zIndexOffset="10000"
                            :lat-lng="latLng(loc.Latitud, loc.Longitud)">
                            <l-icon :icon-size="[15, 15]">
                                <svg width="15" height="15">
                                    <g :style="`width:70px; height:70px; color:red;`">
                                        <circle cx="50%" cy="50%" r="8" fill-opacity="0" stroke="#258dc8"
                                            stroke-width="1px" stroke-opacity="0.5">
                                            <animate attributeName="r" from="0" to="10" dur="4s"
                                                repeatCount="indefinite" />
                                            <animate attributeName="stroke-opacity" from="1" to="0" dur="3s"
                                                repeatCount="indefinite"></animate>
                                        </circle>

                                        <circle cx="50%" cy="50%" r="7" fill="#258dc8" stroke="#258dc8"></circle>
                                    </g>

                                </svg>
                            </l-icon>
                            <l-popup>
                                <infoProductionComponent :value="selected"></infoProductionComponent>
                            </l-popup>

                        </l-marker>
                    </v-marker-cluster>

                    <v-card elevation="6" width="40%" class="rounded-xl rounded-tl-0 rounded-bl-0 card" style="z-index:1000"
                        v-if="isPc">
                        <v-card-text class="pt-16 mt-16"> 
                            <v-row>
                                <v-col class="col-12 pa-1">
                                    <selectComponent rounded v-model="search.Formato" label="Formato"
                                        :items="['Película','Serie',{value:'',text:'Todos los formatos'}]">
                                    </selectComponent>
                                </v-col>

                                <v-col class="col-12 pa-1">
                                    <v-autocomplete dense hide-details rounded v-model="search.Titulo"
                                        label="Títulos" :items="listOfTitles" outlined></v-autocomplete>
                                </v-col>
                                <v-col class="col-12 pa-1">
                                    <v-autocomplete dense hide-details rounded v-model="search.Director"
                                        label="Todas los Directores" :items="listOFDirectors" outlined></v-autocomplete>
                                </v-col>
                                <v-col class="col-12 pa-1">
                                    <v-autocomplete dense hide-details rounded v-model="search.Productora"
                                        label="Todas las Productoras" :items="listOFProducers" outlined></v-autocomplete>
                                </v-col>
                                <v-col class="col-12 pa-1">
                                    <v-input class="range-slider" hide-details>
                                        <template v-slot:prepend>
                                            <span class="mt-1">1933</span>
                                        </template>
                                        <template v-slot:append>
                                            <span class="mt-1">2023</span>
                                        </template>
                                        <v-slider min="1933" max="2023" hide-details v-model="search.Ano"
                                            thumb-color="#00bcd4"></v-slider>
                                    </v-input>
                                </v-col>

                                <v-col class="col-12 text-center pa-1">
                                    <h2 class="mb-0 canela-font">Distribucion especial de los rodajes</h2>
                                </v-col>
                                <v-col class="col-12 pa-1">

                                    <v-autocomplete dense hide-details rounded v-model="search.Comunidad_autonoma"
                                        label="Comunidad autonoma" :items="listOFComunitys" outlined></v-autocomplete>
                                </v-col>
                                <v-col class="col-6 pa-1">
                                    <v-autocomplete dense hide-details rounded v-model="search.Provincia"
                                        label="Provincia" :items="listOFProvinces" outlined></v-autocomplete>
                                </v-col>
                                <v-col class="col-6 pa-1">
                                    <v-autocomplete dense hide-details rounded v-model="search.Municipio"
                                        label="Municipio" :items="listOFMuniciples" outlined></v-autocomplete>

                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </l-map>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    const L = require('leaflet');
    import selectComponent from '@/components/forms/fields/selectComponent.vue'
    import waveComponent from '@/components/waveComponent.vue'
    import pointComponent from '@/components/pointComponent.vue'
    import infoProductionComponent from '@/components/infoProductionComponent.vue'
    import {
        latLng
    } from 'leaflet';

    import complete_locs from '@/assets/complete_locs.json'


    import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";
    import "leaflet.markercluster/dist/MarkerCluster.css";
    import "leaflet.markercluster/dist/MarkerCluster.Default.css";

    export default {
        components: {
            selectComponent: selectComponent,
            waveComponent: waveComponent,
            pointComponent: pointComponent,
            "v-marker-cluster": Vue2LeafletMarkerCluster,
            infoProductionComponent: infoProductionComponent
        },
        name: 'completePage',
        data() {
            return {
                completeLocs:[],
                selected: {},
                search: {
                    Formato: '',
                    'Titulo': '',
                    'Director': '',
                    'Comunidad_autonoma': '',
                    'Provincia': '',
                    'Municipio': ''

                },
                zoom: 6,
                center: [40, -9],
                latLng: latLng,
                options: {
                    zoomSnap: 0.25,

                },
                listOFProvinces:[],
                listOFMuniciples:[],
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'


            }
        },
        created() {
            this.completeLocs = complete_locs.map((loc)=>{
                return {
                    ...loc,
                    Latitud:parseFloat(loc.Latitud),
                    Longitud:parseFloat(loc.Longitud)
                }
            })
        },
        methods: {
            getUniqueValues(key) {
                var values = []
                values = this.completeLocs.map((v) => {
                    return v[key]
                })
                const result = new Set(values);
                return Array.from(result);
            }

        },
        computed: {
            locationFilter() {
                return this.completeLocs.filter((item) => {
                    return Object.keys(this.search).every((key) => {
                        if (this.search[key] == '' || this.search[key] == null) {
                            return true
                        }
                        if (key == 'Ano') {
                            return parseInt(item[key]) >= parseInt(this.search[key])
                        }
                        return this.search[key] == item[key];
                    });
                });
            },
            listOFYears() {
                return this.getUniqueValues('Ano')
            },
            listOFProducers() {
                return this.getUniqueValues('Productora')
            },
            listOfTitles() {
                return [ ...this.getUniqueValues('Titulo')]
            },
            listOFComunitys() {
                return [ ...this.getUniqueValues('Comunidad_autonoma')]
            },


            listOFDirectors() {
                return [...this.getUniqueValues('Director')]
            },
            isPc() {
                return window.innerWidth > 768
            },


        },
        watch: {
            "search.Comunidad_autonoma": function () {
                this.search.Provincia = ''
                this.search.Municipio = ''
                const bounds = this.locationFilter.map((v) => {
                    return [v.Latitud, v.Longitud]
                })


                this.listOFProvinces = [ ...this.completeLocs.filter((p)=>{
                    console.log(p.Provincia, this.search.Provincia)
                    return p.Comunidad_autonoma == this.search.Comunidad_autonoma
                }).map((p)=>{
                    return p.Provincia
                })]


                this.$refs.map.fitBounds(bounds)
            },
            "search.Provincia": function (val) {
                const bounds = this.locationFilter.map((v) => {
                    return [v.Latitud, v.Longitud]
                })


                this.listOFMuniciples = [ ...this.completeLocs.filter((p)=>{
                    console.log(p.Provincia, this.search.Provincia)
                    return p.Provincia == this.search.Provincia
                }).map((p)=>{
                    return p.Municipio
                })]


                this.$refs.map.fitBounds(bounds)
            },
            "search.Municipio": function (val) {
                const bounds = this.locationFilter.map((v) => {
                    return [v.Latitud, v.Longitud]
                })
                this.$refs.map.fitBounds(bounds)
            },

        }
    }
</script>

<style>
    .range-slider {
        border: 1px solid #9E9E9E !important;
        border-radius: 50px !important;
        ;
        padding: 3px !important;
        ;

    }

    .marker-cluster-small div {
        background: #edc237 !important;
    }

    .marker-cluster-small {
        background: #f2eeac !important;
    }

    .leaflet-popup-content {
        min-height: 300px;
        width: 250px;
    }

    .leaflet-popup-content-wrapper {
        border-radius: 20px !important;
        background: #333333 !important;
        color: white !important;

    }
    .card{
        height: 80%!important;
        z-index: 1000;
        height: 80%!important;
        padding: 25px;
    }
</style>