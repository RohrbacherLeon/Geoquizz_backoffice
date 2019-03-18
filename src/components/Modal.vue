<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                
                <div class="modal-body">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <img :src="'http://localhost:8084/photos/'+photos[0].url" class="img-thumbnail rounded ">
                    <div class="form-group">
                        <label for="description">Ajouter une description</label>
                        <textarea class="form-control" name="description" id="description" cols="30" rows="10" v-model="description"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal" data-dismiss="modal" >Fermer</button>
                    <button type="button" class="btn btn-primary" @click="saveDescription(photos[0])">Sauvegarder</button>
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
            description:""
        }
    },
    props:['photos', 'serie'],
    methods: {
        saveDescription(photo){
            photo.description = this.description;
            photo.serie = {id:this.serie};
            axios.put(photo._links.self.href, photo,{
                headers:{
                    "x-token" : photo.token
                }
            }
            ).then(res => {
                let id = photo._links.self.href.split('/').reverse()[0]
                this.$emit("dicreasePhotos", photo.id)
                this.description="";
                
            })
        },
        closeModal(){
            this.description=""
        }
    },
    
}
</script>

<style>

</style>
