<template>
    <nav class="navbar navbar-expand-lg navbar-light static-top">
        <div class="container">
            <router-link to="/login" class="navbar-brand"  ><img src="../assets/logo.png" alt=""></router-link>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Accueil
                            <span class="sr-only">(current)</span>
                        </a>
                    </li>
                    
                    <li v-if="!showLogout" class="nav-item">
                        <router-link to="/login" class="nav-link" >Connexion</router-link>
                    </li>
                    <li v-if="!showLogout" class="nav-item">
                        <router-link to="/signup" class="nav-link" >Inscription</router-link>
                    </li>

                    <li v-if="showLogout" class="nav-item">
                        <a @click="logout" class="nav-link disconnect">Deconnexion</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        methods:{
            logout(){
                localStorage.removeItem('user')
                this.$router.push('/login')
            }
        },
        computed:{
            showLogout(){
                return localStorage.getItem('user')
            }
        }
    }
</script>

<style scoped>
    a{
        width: 10%;

        
    }

    a img{
        width: 100%;
    }

    .disconnect{
        cursor: pointer;
    }
</style>
