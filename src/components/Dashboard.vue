<template>
    <div id="wrapper">

        <!-- Sidebar -->
        <ul class="sidebar navbar-nav">
            <li class="nav-item active" @click="setBreadcrumbs('')">>
                <router-link to="/dashboard" class="nav-link" >
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </router-link>
            </li>
            <li class="nav-item" @click="setBreadcrumbs('photos')">
                <router-link class="nav-link" to="dashboard/photos" >
                    <i class="fas fa-fw fa-chart-area"></i>
                    <span>Mes photos</span>
                </router-link>
            </li>
            <li class="nav-item" @click="setBreadcrumbs('serie')">
                <router-link class="nav-link" to="dashboard/create-serie" >
                    <i class="fas fa-fw fa-chart-area"></i>
                    <span>Créer une série</span>
                </router-link>
            </li>
        </ul>

        <div id="content-wrapper">

            <div class="container-fluid">

                <!-- Breadcrumbs-->
                <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="#">Dashboard</a>
                </li>
                    <li class="breadcrumb-item active">{{breadcrumb_active}}</li>
                </ol>

                <router-view></router-view>

            </div>

        </div>
        <!-- /.container-fluid -->

        <!-- Sticky Footer -->
        <footer class="sticky-footer">
            <div class="container my-auto">
            <div class="copyright text-center my-auto">
                <span>Copyright © Geoquizz 2019</span>
            </div>
            </div>
        </footer>

        <!-- /.content-wrapper -->

    </div>
</template>

<script>
export default {

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
