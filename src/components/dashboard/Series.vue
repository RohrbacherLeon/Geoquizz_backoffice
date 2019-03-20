<template>
    <div class="container">
        <h2 class="mt-4">Les series</h2>
        <div class="row mt-4">
            <div class="col-xl-4 col-sm-6 mb-4" v-for="(serie,index) in series" :key="index">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">{{serie.ville}}</h5>
                        <p class="card-text">Coordonnée: {{serie.map_long}} - {{serie.map_lat}}</p>
                        <button class="btn button" @click="findPhotos(serie)"> Voir les photos</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    data() {
        return {
            series:[]
        }
    },
    mounted() {
        axios.get(`http://localhost:8080/series`).then(res => {
            this.series = res.data._embedded.series.slice(1);
        })
    },
    methods: {
        findPhotos(serie){
            this.$emit('findPhotos', serie)
        }
    },
}
</script>

<style scoped>
    .btn{
        background-color: #DE685F;
        color: white
    }

    .btn:hover{
        opacity: 0.9;
        color: #eee;
    }
</style>
