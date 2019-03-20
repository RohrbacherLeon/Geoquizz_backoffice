<template>
    <div id="wrapper">

        <div id="content-wrapper">

            <div class="container-fluid">

                <Series v-if="showSeries" v-on:findPhotos="findPhotos"></Series>
                <Photos v-if="showPhotos" :photos="photos" :serie="serie"></Photos>


            </div>

        </div>
        <!-- /.container-fluid -->


        <!-- /.content-wrapper -->

    </div>
</template>

<script>
import Series from './dashboard/Series.vue'
import axios from "axios"
import Photos from './dashboard/Photos.vue'
export default {
    components:{Series,Photos},
    data() {
        return {
            showPhotos:false,
            showSeries:true,
            photos:[],
            serie:{}
        }
    },

    methods: {
        findPhotos(serie){
            axios.get(`http://localhost:8080/series/${serie.id}/photos`).then(res => {
                this.photos = res.data._embedded.photos;
                this.serie = serie;
                this.toggleSeriePhotos()
            })
        },
        toggleSeriePhotos(){
            this.showPhotos = !this.showPhotos
            this.showSeries = !this.showSeries
        }
    },

}
</script>

<style>

</style>
