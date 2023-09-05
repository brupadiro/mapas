<template>
    <v-row no-gutters>
        <v-col class="col-12">
            <h2 class="text-center white--text">{{value.Titulo_original}}</h2>
        </v-col>
        <v-col class="col-12">
            <p class="text-center white--text">{{value.Director}}, {{value.Productora}}</p>
        </v-col>
        <v-col class="col-12">
            <v-img src="https://indiehoy.com/wp-content/uploads/2021/06/once-upon-a-time-in-hollywood.jpg" width="100%" height="150"></v-img>
        </v-col>
        <v-col class="col-12">
            <p class="white--text text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed</p>
            
        </v-col>
        <v-col class="col-12 text-center">
            <a href="#" style="color: orange!important;">Articulo relacionado</a>
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
        }
    }
</script>

<style>

</style>