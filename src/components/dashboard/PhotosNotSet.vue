<template>
    <div class="modal fade" id="photosNotSet" tabindex="-1" role="dialog" aria-hidden="true" >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Sélectionner les photos à ajouter</h5>
                </div>
                <div class="modal-body">
                    {{serieId}}

                    <div class="row">
                        <div class="col-xl-3 col-sm-6 mb-3" v-for="(photo, index) in photos" :key="index">
                             <input type="checkbox" :id="'check_'+index" />
                            <label :for="'check_'+index">
                                <img :src="'http://localhost:8084/photos/'+photo.url" class="img-thumbnail rounded " @click="photoToAdd(photo)">   
                            </label>
                        </div>
                    </div>


                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary"  data-dismiss="modal">Annuler</button>
                    <button type="button" class="btn btn-primary" @click="sendPhotos">Ajouter</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    props:['serieId'],
    data() {
        return {
            photos:[],
            photosToSend:[]
        }
    },
    mounted() {
        this.resetPhotos()
    },
    methods: {
        photoToAdd(photo){
            if(this.photosToSend.indexOf(photo) == -1){
                this.photosToSend.push(photo)
            }else{
                this.photosToSend.splice(this.photosToSend.indexOf(photo))
            }
        },
        sendPhotos(){

            this.photosToSend.forEach(photo => {
                photo.serie = {id: this.serieId}
                let config = {headers:{'x-token' : photo.token}}
                axios.put(`http://localhost:8080/photos/${photo.id}`, photo, config).then(res => {
                    this.photosToSend.splice(this.photosToSend.indexOf(photo), 1)
                    this.photos.splice(this.photos.indexOf(photo), 1)
                }) 
            })
        },
        resetPhotos(){
            let {token, id} = JSON.parse(localStorage.getItem('user'));
        
            let config = {headers:{'x-token':token}}
            axios.get(`http://localhost:8080/users/${id}/photos`, config).then(res => {
                this.photos = res.data._embedded.photos;
                
            })
        }
    },
}
</script>

<style scoped>
    .modal-dialog{
        max-width: 90%;
    }

    .modal img{
        height: 200px;
        width: 100%;
        object-fit: cover;
    }

    input[type="checkbox"][id^="check"] {
  display: none;
}

label {
  border: 1px solid #fff;
  padding: 10px;
  display: block;
  position: relative;
  margin: 10px;
  cursor: pointer;
}

label:before {
  background-color: white;
  color: white;
  content: " ";
  display: block;
  border-radius: 50%;
  border: 1px solid grey;
  position: absolute;
  top: -5px;
  left: -5px;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 28px;
  transition-duration: 0.4s;
  transform: scale(0);
}

label img {
  height: 100px;
  width: 100px;
  transition-duration: 0.2s;
  transform-origin: 50% 50%;
}

:checked + label {
  border-color: #ddd;
}

:checked + label:before {
  content: "✓";
  background-color: grey;
  transform: scale(1);
}

:checked + label img {
  transform: scale(0.9);
  /* box-shadow: 0 0 5px #333; */
  z-index: -1;
}
</style>
