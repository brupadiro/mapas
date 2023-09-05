<template>
    <v-container fluid>
        <v-row>

            <v-col class="col-12">
                <v-card elevation="6" class="rounded-xl rounded-tl-0 rounded-bl-0" style="z-index:1000" v-if="!isPc">
                            <v-card-text>
                                <v-row>
                                    <v-col class="col-12">
                                        <selectComponent rounded v-model="search.Formato" label="Formato"
                                            :items="['Película','Serie',{value:'',text:'Peliculas y Series'}]">
                                        </selectComponent>
                                    </v-col>

                                    <v-col class="col-12">
                                        <selectComponent v-model="search.Titulo_original" label="Anio"
                                            :items="listOfTitles">
                                        </selectComponent>
                                    </v-col>
                                    <v-col class="col-12">
                                        <selectComponent rounded v-model="search.Director" label="Director"
                                            :items="listOFDirectors"></selectComponent>
                                    </v-col>
                                    <v-col class="col-12">
                                        <selectComponent rounded v-model="search.Director" label="Director"
                                            :items="listOFDirectors"></selectComponent>
                                    </v-col>
                                    <v-col class="col-12">
                                        <v-input class="range-slider" hide-details>
                                            <template v-slot:prepend>
                                                <span class="mt-1">1933</span>
                                            </template>
                                            <template v-slot:append>
                                                <span class="mt-1">2023</span>
                                                </template>
                                            <v-slider min="1933"  max="2023" hide-details v-model="search.Ano" thumb-color="#00bcd4"></v-slider>
                                        </v-input>
                                    </v-col>

                                    <v-col class="col-12 text-center">
                                        <h2 class="mb-0">Distribucion especial de los rodajes</h2>
                                    </v-col>
                                    <v-col class="col-12">
                                        <selectComponent rounded v-model="search.Comunidad_autonoma"
                                            label="Comunidad autonoma" :items="listOFComunitys"></selectComponent>
                                    </v-col>
                                    <v-col class="col-6">
                                        <selectComponent rounded v-model="search.Provincia" label="Provincia"
                                            :items="listOFProvinces"></selectComponent>
                                    </v-col>
                                    <v-col class="col-6">
                                        <selectComponent rounded v-model="search.Municipio" label="Municipio"
                                            :items="listOFMuniciples"></selectComponent>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                    </v-card>


            </v-col>


            <v-col class="col-md-12">
                <l-map ref="map" draggable="false" :center="latLng([40, -3.5], 6)" :zoom="6" style="height:100vh"
                    class="d-flex align-center">
                    <l-tile-layer :url="url" />
                    <v-marker-cluster>
                        <l-marker v-for="(loc,index) in locationFilter" @click="selected = loc"
                            :key="loc.ID_película+index" :zIndexOffset="10000"
                            :lat-lng="latLng(loc.Coordenada_latitud, loc.Coordenada_longitud)">
                            <l-icon :icon-size="[15, 15]">
                                <svg width="15" height="15">
                                    <g
                                    :style="`width:70px; height:70px; color:red;`">
                                    <circle cx="50%" cy="50%" r="8" fill-opacity="0" stroke="#258dc8" stroke-width="1px"
                                        stroke-opacity="0.5">
                                        <animate attributeName="r" from="0" to="10" dur="4s" repeatCount="indefinite" />
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

                    <v-card elevation="6" width="40%" class="rounded-xl rounded-tl-0 rounded-bl-0" style="z-index:1000" v-if="isPc">
                            <v-card-text>
                                <v-row>
                                    <v-col class="col-12">
                                        <selectComponent rounded v-model="search.Formato" label="Formato"
                                            :items="['Película','Serie',{value:'',text:'Peliculas y Series'}]">
                                        </selectComponent>
                                    </v-col>

                                    <v-col class="col-12">
                                        <selectComponent v-model="search.Titulo_original" label="Anio"
                                            :items="listOfTitles">
                                        </selectComponent>
                                    </v-col>
                                    <v-col class="col-12">
                                        <selectComponent rounded v-model="search.Director" label="Director"
                                            :items="listOFDirectors"></selectComponent>
                                    </v-col>
                                    <v-col class="col-12">
                                        <selectComponent rounded v-model="search.Director" label="Director"
                                            :items="listOFDirectors"></selectComponent>
                                    </v-col>
                                    <v-col class="col-12">
                                        <v-input class="range-slider" hide-details>
                                            <template v-slot:prepend>
                                                <span class="mt-1">1933</span>
                                            </template>
                                            <template v-slot:append>
                                                <span class="mt-1">2023</span>
                                                </template>
                                            <v-slider min="1933"  max="2023" hide-details v-model="search.Ano" thumb-color="#00bcd4"></v-slider>
                                        </v-input>
                                    </v-col>

                                    <v-col class="col-12 text-center">
                                        <h2 class="mb-0">Distribucion especial de los rodajes</h2>
                                    </v-col>
                                    <v-col class="col-12">
                                        <selectComponent rounded v-model="search.Comunidad_autonoma"
                                            label="Comunidad autonoma" :items="listOFComunitys"></selectComponent>
                                    </v-col>
                                    <v-col class="col-6">
                                        <selectComponent rounded v-model="search.Provincia" label="Provincia"
                                            :items="listOFProvinces"></selectComponent>
                                    </v-col>
                                    <v-col class="col-6">
                                        <selectComponent rounded v-model="search.Municipio" label="Municipio"
                                            :items="listOFMuniciples"></selectComponent>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                    </v-card>
                </l-map>
            </v-col>
        </v-row>
    </v-container>
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
            infoProductionComponent:infoProductionComponent
        },
        name: 'completePage',
        data() {
            return {
                completeLocs: complete_locs,
                selected: {},
                search: {
                    Formato: '',
                    'Titulo_original': '',
                    'Director': '',
                    'Comunidad_autonoma': '',
                    'Provincia': '',
                    'Municipio': ''

                },
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
                        if (this.search[key] == '') {
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
                return [{
                    value: '',
                    text: 'Todos los titulos'
                }, ...this.getUniqueValues('Titulo_original')]
            },
            listOFDirectors() {
                return [{
                    value: '',
                    text: 'Todos los directores'
                }, ...this.getUniqueValues('Director')]
            },
            listOFMuniciples() {
                return [{
                    value: '',
                    text: 'Todas los municipios'
                }, ...this.getUniqueValues('Municipio')]
            },
            listOFProvinces() {
                return [{
                    value: '',
                    text: 'Todas las provincias'
                }, ...this.getUniqueValues('Provincia')]
            },
            listOFComunitys() {
                return [{
                    value: '',
                    text: 'Todas las comunidades autonomas'
                }, ...this.getUniqueValues('Comunidad_autonoma')]
            },
            isPc() {
                return window.innerWidth > 768
            },
            

        }
    }
</script>

<style>
.range-slider{
    border: 1px solid #9E9E9E!important;
    border-radius: 50px !important;;
    padding: 3px !important;;

}
.marker-cluster-small div{
    background:#edc237!important;
}
.marker-cluster-small{
    background:#f2eeac!important;
}
.leaflet-popup-content{
    min-height: 300px;
    width: 250px;
    background:#333333!important
    }
.leaflet-popup-content-wrapper{
    background:#333333!important;
        border-radius: 20px!important;

}

</style>