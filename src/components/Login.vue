<template>
    <form class="form-signin container">
        <h1 class="h3 mb-3 font-weight-normal">Connexion</h1>

        <div class="form-group">
            <label for="inputEmail" class="sr-only">Identifiant</label>
            <input v-model="login" type="text" id="inputText" class="form-control" placeholder="Identifiant" required="" autofocus="">
        </div>

        <div class="form-group">
            <label for="inputPassword" class="sr-only">Mot de passe</label>
            <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Mot de passe" required="">
        </div>
        <button class="btn btn-lg btn-primary btn-block" @click="signin" type="submit">Se connecter</button>
    </form>
</template>

<script>
import axios from "axios"
export default {
    data(){
        return{
            login:"",
            password:""
        }
    },
    methods:{
        signin(e){
            e.preventDefault();
            
            axios.post("http://localhost:8080/users/signin", {
                login: this.login,
                password: this.password
            }).then(res => {
                localStorage.setItem("user", JSON.stringify({token: res.data.token, id: res.data.id}));
                console.log(res.data)
                this.$router.push('/dashboard')
            }).catch(err => {
                console.log(err)
            })
            
        }
    }
}
</script>

<style scoped>
    .form-signin{
        flex-grow: 1;
        width: 100%;
        max-width: 330px;
        padding: 15px;
        margin: auto;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .form-group{
        width:100%;
    }

    button{
        margin-top: 30px;
    }
</style>
