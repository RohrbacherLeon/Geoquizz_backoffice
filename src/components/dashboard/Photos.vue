<template>
    <div >
        <div v-if="photosToSend.length > 0" class="row">
            <div class="input-group col-6 offset-2">
                <select class="custom-select" id="inputGroupSelect04" v-model="serieId">
                    <option value="-1">Choisir une serie</option>
                    <option v-for="(serie, index) in series" :key="index" :value="serie.id">{{serie.ville}}</option>
                </select>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="insertInSerie" data-toggle="modal" data-target="#exampleModal">Ajouter</button>
                </div>
            </div>
            <div class="col-2">
                <button class="btn btn-primary" @click="showCreateModal" type="button" data-toggle="modal" data-target="#createModal">Créer</button>
            </div>
        </div>
        <!-- Icon Cards-->
        <div class="row">
            <div class="col-xl-3 col-sm-6 mb-3 photo" v-for="photo in photos" :key="photo.name">
                <input type="checkbox" name="" :id="'checkbox_' + photo.description">
                <label class="label" :for="'checkbox_' + photo.description" @click="addPhotoToSerie(photo)">
                    <img :src="'http://localhost:8084/photos/'+photo.url" class="img-thumbnail rounded ">
                </label>

            </div>
            
        </div>

        <Modal v-if="showModal" :serie="serieId" v-on:dicreasePhotos="dicreasePhotos" :photos='photosToSend'></Modal>
        <Create v-if="showCreate" v-on:reloadSeries="reloadSeries"></Create>
    </div>
</template>

<script>
import axios from "axios"
import Modal from '../Modal.vue'
import Create from '../Create.vue'

export default {
    components:{
        Modal, Create
    },
    data(){
        return{
            photos:[],
            photosToSend:[],
            series: [],
            serieId:"",
            description:"",
            showModal:false,
            showCreate:false
        }
    },
    mounted(){
        let {token, id} = JSON.parse(localStorage.getItem('user'));
        
        axios.get(`http://localhost:8080/users/${id}/photos`, {
            headers: {"x-token": token}
        }).then(res => {
            this.photos = res.data._embedded.photos;
        })

        this.reloadSeries()
    },
    methods: {
        addPhotoToSerie(photo){
            if(this.photosToSend.includes(photo)){
                this.photosToSend.splice(this.photosToSend.indexOf(photo), 1)
            }else{
                this.photosToSend.push(photo);
            }
        },

        insertInSerie(e){
            e.preventDefault();
            this.showModal=true;

        },
        dicreasePhotos(id){
            this.photos.forEach(photo => {
                if(photo.id == id){
                    this.photos.splice(this.photos.indexOf(photo), 1)
                }
            });

            this.photosToSend.forEach(photo => {
                if(photo.id == id){
                    this.photosToSend.splice(this.photosToSend.indexOf(photo), 1)
                }
            });

            if(this.photosToSend.length == 0){
                this.showModal = false
                document.querySelector('.modal-backdrop').remove();
            }
        },
        showCreateModal(){
            this.showCreate = true;
        },
        reloadSeries(){
            this.showCreate = false;
            axios.get(`http://localhost:8080/series`).then(res => {
                this.series = res.data._embedded.series.slice(1);
            })
        }

        
   },
}
</script>

<style>
    .photo{
        height: 200px;
        position:relative;
    }

    button{
        margin-top: 0;
    }

    input[type="checkbox"][id^="checkbox"]{
        display: none;
    }

    .label {
        height: 200px;
        border: 1px solid #fff;
        padding: 10px;
        display: block;
        position: relative;
        margin: 10px;
        cursor: pointer;
    }

    .label:before {
        background-color: white;
        color: white;
        content: " ";
        display: flex;
        border-radius: 50%;
        border: 1px solid grey;
        position: absolute;
        top: -5px;
        left: -5px;
        width: 25px;
        height: 25px;
        justify-content: center;
        align-items: center;
        transition-duration: 0.4s;
        transform: scale(0);
    }

    .label img {
        height: 100%;
        width: 100%;
        transition-duration: 0.2s;
        transform-origin: 50% 50%;
        object-fit: cover;
    }



    input[type="checkbox"][id^="checkbox"]:checked + label {
        border-color: #ddd;
    }

    input[type="checkbox"][id^="checkbox"]:checked + label:before {
        content: "✓";
        background-color: grey;
        transform: scale(1);
    }

    input[type="checkbox"][id^="checkbox"]:checked + label img {
        transform: scale(0.9);
        /* box-shadow: 0 0 5px #333; */
        z-index: -1;
    }
</style>
