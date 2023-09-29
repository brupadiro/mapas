<template>
    <v-row no-gutters>
        <v-col class="col-12">
            <h2 class="text-center text-h5 font-weight-bold">{{value.Titulo_original}}</h2>
        </v-col>
        <v-col class="col-12">
            <p class="text-center ">{{value.Director}}, {{value.Productora}}</p>
        </v-col>
        <v-col class="col-12">
            <p class="text-center ">{{value.Productora}}</p>
        </v-col>

        <v-col class="col-12">
            <v-img :src="transformDriveUrl(value.imgprincipal)" width="100%" height="150"></v-img>
        </v-col>
        <v-col class="col-12">
            <p class=" text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed</p>
            
        </v-col>
        <v-col class="col-12 text-center" v-if="value.Url_articulo">
            <a :href="value.Url_articulo" target="_blank" style="color: orange!important;">Articulo relacionado</a>
        </v-col>
        <v-col class="col-12 text-center">
            <img src="/pin.svg" height="50px">
        </v-col>


    </v-row>
</template>

<script>
    export default {
        props:{
            value:{
                type:Object,
                default:()=>{}
            }
        },
        methods: {
            transformDriveUrl(url) {
                if(!url) return;
                let fileId = url.split('u/1/folders/')[1];
                console.log('https://drive.google.com/uc?export=view&id=' + fileId)
                return 'https://drive.google.com/uc?export=view&id=' + fileId;
            }
        }
    }
</script>
<style>

</style>