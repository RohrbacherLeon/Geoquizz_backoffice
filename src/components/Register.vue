<template>
    <form class="form-signup container">
        <div v-if="error" class="alert alert-danger text-center" role="alert">
            {{error}}
        </div>
        <h1 class="h3 mb-3 font-weight-normal">Inscription</h1>

        <div class="form-group">
            <label for="inputText" class="sr-only">Identifiant</label>
            <input v-model="login" type="text" id="inputText" class="form-control" placeholder="Identifiant" required="" autofocus="">
        </div>

        <div class="form-group">
            <label for="inputPassword" class="sr-only">Mot de passe</label>
            <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Mot de passe" required="">
        </div>

        <div class="form-group">
            <label for="inputPasswordConf" class="sr-only">Confirmation du mot de passe</label>
            <input v-model="passwordConfirm" type="password" id="inputPasswordConf" class="form-control" placeholder="Confirmez votre mot de passe" required="">
        </div>
        <button class="btn btn-lg btn-block" @click="signup" type="submit">S'inscrire</button>
    </form>
</template>

<script>
import axios from "axios"
export default {
    data(){
        return{
            login: "",
            password: "",
            passwordConfirm: "",
            error:""
        }
    },
    methods:{
        signup(e){
            e.preventDefault();

            if(this.password !== this.passwordConfirm){
                this.error = "Les mots de passes ne sont pas identiques.";
            }

            if(this.login !== "" && this.password !== ""){
                axios.post("http://localhost:8080/users", {
                    login: this.login,
                    password: this.password
                }).then(res => {
                    console.log(res);
                    
                }).catch(error => {
                    if(this.password.length < 8 ){
                        this.error = "Mot de passe trop court : 8 caractères minimums."
                    }else{
                        this.error = "Identifiant déjà utilisé."
                    }
                })
            }
        }
    }
}
</script>

<style>

    

    .form-signup{
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

    .btn{
        background-color: #DE685F;
        color: white
    }

    button{
        margin-top: 30px;
        
    }

</style>
