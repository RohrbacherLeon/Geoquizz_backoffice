<template>
    <div class="home">
        <div class="image"></div>
        <router-link class="btn button mt-4" to="/login"><h2>Gérez vos geoquizz</h2></router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

h2{
    margin: 0;
}

    .button{
        z-index: 333;
        background-color: #DE685F;
        color: white
    }

    .home{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;

    }

    .image{
        position: absolute;
        width: 100%;
        height: 100%;
        background: url("../../assets/home.jpg")
    }

    .image::after{
        content: "";
        background-color: #222;
        opacity: 0.2;
        height: 100%;
        width: 100%;
        position: absolute;
    }
</style>
