<template>
    <div class="container">
        <h1>{{serie.ville}}</h1>
        <div class="d-flex justify-content-between mb-4">
            <button class="btn btn-outline-dark" @click="$parent.toggleSeriePhotos" ><i class="fas fa-arrow-left"></i> &nbsp;Retour</button>
            <button class="btn btn-success" data-toggle="modal" data-target="#photosNotSet" @click="togglePhotosNotSet"><i class="fas fa-plus"></i> &nbsp;Ajouter des images à cette série</button>
        </div>
       
        <!-- Icon Cards-->
        <div class="row">
            <div class="col-xl-3 col-sm-6 mb-3 photo" v-for="photo in photos" :key="photo.name">
                <div class="closebutton" @click="deletePhoto(photo)">x</div>
                <img :src="'http://localhost:8084/photos/'+photo.url" class="img-thumbnail rounded ">
            </div>
            
        </div>
        <PhotosNotSet v-if="showPhotosNotSet" :serieId="serie.id"></PhotosNotSet>
    </div>
</template>

<script>
import axios from "axios"
import PhotosNotSet from "./PhotosNotSet.vue"
export default {
    props :['photos', 'serie'],
    components :{PhotosNotSet},
    data(){
        return{
            showPhotosNotSet: false
        }
    },
    mounted(){
        
    },
    methods: {
        deletePhoto(photo){
            if(confirm('Voulez vous vraiment supprimer cette photo')){
                let config = {headers:{'x-token':photo.token}}
                axios.delete(`http://localhost:8080/photos/${photo.id}`, config).then(res => {
                    console.log(res.data);
                    this.photos.splice(this.photos.indexOf(photo),1);
                    
                })
            }
        },
        
        togglePhotosNotSet(){
            this.showPhotosNotSet = true;
        }
        
   },
}
</script>

<style>
    .photo img{
        height: 200px;
        width: 100%;
        object-fit: cover;
        position: relative;
    }

    .photo .closebutton{
        display: none;
    }

    .photo:hover .closebutton{
        position: absolute;
        cursor: pointer;
        top: -15px;
        right: 0;
        height: 30px;
        width: 30px;
        background-color: red;
        border-radius: 50%;
        z-index: 33;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }
</style>
