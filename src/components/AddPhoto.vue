<template>
    <div class="modal fade" id="addPhoto" tabindex="-1" role="dialog" aria-hidden="true" >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <div v-if="errors.length > 0" class="alert alert-danger text-center">{{ errors[0] }}</div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="reset" >
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="form-group">
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="customFile" @change="setImage">
                            <label class="custom-file-label" for="customFile">
                                <span v-if="image">{{image.name}}</span>
                                <span v-else>Choisir une image</span>
                            </label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label for="">Longitude</label>
                                <input class="form-control" type="text" name="" id="" v-model="longitude">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label for="">Latitude</label>
                                <input class="form-control" type="text" name="" id="" v-model="latitude">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <label for="">Serie</label>
                            <select class="custom-select" v-model="serieId">
                                <option value="-1">Choisir une serie</option>
                                <option v-for="(serie, index) in series" :key="index" :value="serie.id">{{serie.ville}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                        <div class="form-group">
                            <label for="">Description</label>
                            <textarea class="form-control" name="" id="" cols="30" rows="10" v-model="description"></textarea>
                        </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary"  data-dismiss="modal" @click="reset" >Annuler</button>
                    <button type="button" class="btn btn-primary" id="add" @click="addPhoto">Ajouter</button>
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
            longitude:"",
            latitude:"",
            description: "",
            image:null,
            serieId:'',
            series:[],
            errors:[]

        }
    },
    mounted() {
        axios.get(`http://localhost:8080/series`).then(res => {
            this.series = res.data._embedded.series.slice(1);
        })
    },

    methods: {
        reset(){
            this.longitude = ""
            this.latitude=""
            this.description= ""
            this.image=null
            this.serieId=''
        },
        addPhoto(){
            this.errors = []
            if(!this.image){
                this.errors.push('Veuillez selectionner une image')
            }

            if(this.longitude == "" || this.latitude == "" || this.longitude < 0 || this.latitude < 0){
                this.errors.push('Veuillez remplir des coordonnées valides')
            }

            if(this.serieId == ""){
                this.errors.push('Veuillez choisir une serie')
            }

            if(this.description == ""){
                this.errors.push('Veuillez mettre une description')
            }


            if(this.errors.length == 0){
                let config = {headers:{'Content-Type': 'multipart/form-data'} }
                let fd = new FormData()
                fd.append('file', this.image)
                axios.post("http://localhost:8080/photos", fd, config).then(res => {

                    let photo = res.data;
                    let config = { headers : { "x-token" : photo.token}}

                    photo.description = this.description;
                    photo.serie = {id:this.serieId};
                    photo.longitude = this.longitude
                    photo.latitude = this.latitude

                    axios.put(`http://localhost:8080/photos/${photo.id}`, photo, config).then(result => {
                        this.reset()
                        $('#addPhoto').modal('hide')
                        this.$emit('imageAdded')
                    })

                    
                })
            }
            
        },
        setImage(e){
            this.image = e.target.files[0]
        }
    },
}
</script>

<style>

</style>
