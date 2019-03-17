<template>
    <div>
        <h1>Dashboard boyy</h1>
    </div>
</template>

<script>
import axios from "axios"
export default {

    mounted(){
        let {token, id} = JSON.parse(localStorage.getItem('user'));
        console.log(token)
        console.log(id)
        
        axios.get(`http://localhost:8080/users/${id}/photos`, {
            headers: {"x-token": token}
        }).then(res => {
            console.log(res)
        })
    }

}
</script>

<style>

</style>
