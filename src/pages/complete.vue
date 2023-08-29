<template>
    <v-container fluid>
        <v-row>
            <v-col class="col-md-4 col-12">
                <v-card dark elevation="6" min-height="90vh" class="rounded-xl">
                    <v-slide-x-transition>

                        <div v-show="!selected.Titulo_original">

                            <v-card-title class="font-weight-bold">
                                Buscar pelicula/serie
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-row>
                                    <v-col class="col-12">
                                        <selectComponent v-model="search.Formato" label="Formato"
                                            :items="['Película','Serie']"></selectComponent>
                                    </v-col>

                                    <v-col class="col-12">
                                        <selectComponent v-model="search.Ano" label="Anio" :items="listOFYears">
                                        </selectComponent>
                                    </v-col>
                                    <v-col class="col-12">
                                        <selectComponent v-model="search.Director" label="Director"
                                            :items="listOFDirectors"></selectComponent>
                                    </v-col>
                                    <v-col class="col-12">
                                        <selectComponent v-model="search.Productora" label="Productora"
                                            :items="listOFProducers"></selectComponent>
                                    </v-col>
                                    <v-col class="col-12">
                                        <selectComponent v-model="search.Provincia" label="Provincia"
                                            :items="listOFProvinces"></selectComponent>
                                    </v-col>
                                    <v-col class="col-12">
                                        <selectComponent v-model="search.Municipio" label="Municipio"
                                            :items="listOFMuniciples"></selectComponent>
                                    </v-col>
                                    <v-col class="col-12">
                                        <selectComponent v-model="search.Comunidad_autonoma" label="Comunidad autonoma"
                                            :items="listOFComunitys"></selectComponent>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </div>
                    </v-slide-x-transition>
                    <v-slide-x-reverse-transition>
                        <div v-show="selected.Titulo_original">
                            <v-card-title class="d-flex justify-center font-weight-bold">
                                {{ selected.Titulo_original }}
                                <v-spacer></v-spacer>
                                <v-btn @click="selected = {}">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </v-card-title>
                            <v-img src="https://geocine.uc3m.es/faces/fotogramas/Isabel-tt2011533-T01-C08-15.jpg" cover
                                height="300" width="100%">
                            </v-img>
                            <v-card-text>
                                <v-row>
                                    <v-col class="col-4">
                                        <b>Director</b>
                                    </v-col>
                                    <v-col class="col-8">{{ selected.Director }}</v-col>
                                </v-row>
                                <v-row>
                                    <v-col class="col-4">
                                        <b>Productora</b>
                                    </v-col>
                                    <v-col class="col-8">{{ selected.Productora }}</v-col>
                                </v-row>
                                <v-row>
                                    <v-col class="col-4">
                                        <b>Municipio</b>
                                    </v-col>
                                    <v-col class="col-8">{{ selected.Municipio }}</v-col>
                                </v-row>
                                <v-row>
                                    <v-col class="col-4">
                                        <b>Provincia</b>
                                    </v-col>
                                    <v-col class="col-8">{{ selected.Provincia }}</v-col>
                                </v-row>
                                <v-row>
                                    <v-col class="col-4">
                                        <b>Comunidad autonoma</b>
                                    </v-col>
                                    <v-col class="col-8">{{ selected.Comunidad_autonoma }}</v-col>
                                </v-row>
                            </v-card-text>
                        </div>
                    </v-slide-x-reverse-transition>
                </v-card>

            </v-col>
            <v-col class="col-md-8">
                <v-card dark elevation="6" height="90vh" class="rounded-xl">
                    <l-map ref="map" draggable="false" :center="latLng([40, -3.5], 6)" :zoom="6" style="height:100%">
                        <l-tile-layer :url="url" />
                        <v-marker-cluster>
                            <l-marker v-for="(loc,index) in locationFilter" @click="selected = loc"
                                :key="loc.ID_película+index" :zIndexOffset="10000"
                                :lat-lng="latLng(loc.Coordenada_latitud, loc.Coordenada_longitud)">
                                <l-icon :icon-size="[70, 70]">
                                    <pointComponent></pointComponent>
                                </l-icon>
                            </l-marker>
                        </v-marker-cluster>
                    </l-map>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    const L = require('leaflet');
    import selectComponent from '@/components/forms/fields/selectComponent.vue'
    import waveComponent from '@/components/waveComponent.vue'
    import pointComponent from '@/components/pointComponent.vue'
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
            "v-marker-cluster": Vue2LeafletMarkerCluster
        },
        name: 'completePage',
        data() {
            return {
                completeLocs: complete_locs,
                selected: {},
                search: {},
                latLng: latLng,
                options: {
                    zoomSnap: 0.25,

                },
                url: 'https://tile.jawg.io/1c5dd981-0cb2-41e3-a0fa-f7d6e1e4a826/{z}/{x}/{y}{r}.png?access-token=8ArpEoBiGS2zZwlKLqdLxbmdF8KnbQQdctZ4DoDLDk5fAU8hr3ava9MJaJ74PLTG&f=12'


            }
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
            listOFDirectors() {
                return this.getUniqueValues('Director')
            },
            listOFMuniciples() {
                return this.getUniqueValues('Municipio')
            },
            listOFProvinces() {
                return this.getUniqueValues('Provincia')
            },
            listOFComunitys() {
                return this.getUniqueValues('Comunidad_autonoma')
            },

        }
    }
</script>

<style>

</style>