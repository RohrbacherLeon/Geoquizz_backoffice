<template>
    <div id="wrapper">

        <div id="content-wrapper">

            <div class="container-fluid">

                <!-- Breadcrumbs-->
                <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="#">Dashboard</a>
                </li>
                    <li class="breadcrumb-item active">{{breadcrumb_active}}</li>
                </ol>

                <Photos></Photos>

            </div>

        </div>
        <!-- /.container-fluid -->


        <!-- /.content-wrapper -->

    </div>
</template>

<script>
import Photos from './dashboard/Photos.vue'
export default {
    components:{Photos},
    data() {
        return {
            breadcrumb_active:""
        }
    },

    methods: {
        setBreadcrumbs(bc){
            this.breadcrumb_active = bc
        }
    },

}
</script>

<style>

</style>
