<template>
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
            <router-link to="/" class="navbar-brand"  ><img src="../assets/logo.png" alt=""></router-link>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <li v-if="!test" class="nav-item">
                        <router-link to="/login" class="nav-link" >Connexion</router-link>
                    </li>
                    <li v-if="!test" class="nav-item">
                        <router-link to="/signup" class="nav-link" >Inscription</router-link>
                    </li>

                    <li  v-if="test" class="nav-item">
                        <a  @click="logout" class="nav-link disconnect"><span>Deconnexion</span> &nbsp; <i class="fas fa-sign-out-alt"></i></a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        data() {
            return {
                log: false
            }
        },
        methods:{
            logout(){
                localStorage.removeItem('user')
                this.log = false
                this.$router.push('/login')
            }
        },
        computed:{
            test(){
                return this.log
            }
        }
    }
</script>

<style scoped>
    .navbar-brand{
        width: 10%;
    }

    .navbar-brand img{
        width: 100%;
    }

    .disconnect{
        cursor: pointer;
    }
    
    .navbar{
        -webkit-box-shadow: 0px 6px 11px -6px rgba(179,179,179,1);
        -moz-box-shadow: 0px 6px 11px -6px rgba(179,179,179,1);
        box-shadow: 0px 6px 11px -6px rgba(179,179,179,1);
        display: initial;
        padding: 0;
        background-color: #fff;
    }
</style>
