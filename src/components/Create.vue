<template>
    <div class="modal fade" id="createModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            
                <div class="modal-body">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="form-group">
                        <label for="">Nom de la nouvelle série</label>
                        <input class="form-control" type="text" name="" id="" v-model="name">
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
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal" data-dismiss="modal" >Annuler</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" @click="createSerie">Créer</button>
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
            name: "",
            longitude: "",
            latitude: ""
        }
    },
    methods: {
        createSerie(){

            let longitude = parseFloat(this.longitude)
            let latitude = parseFloat(this.latitude)

            axios.post('http://localhost:8080/series', {
                ville: this.name,
                "map_long":longitude,
                "map_lat":latitude
            }).then(res => {
                this.$emit('reloadSeries')
            })
        },
        closeModal(){
            this.name="";
        }
    },
}
</script>

<style>

</style>
