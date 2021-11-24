<template>
   <div>
        <section class="hero">
            <div class="background-image">
                <img src="@/assets/img/Landing.png" alt="">
            </div>
            <div class="hero-content-area">
                <h2>Be UR future come true</h2>
                <h2>just be UR self</h2>
                <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure" :logoutButton="false" class="social-auth-links text-center mb-3">
                <a href="#" class="btn btn-block bg-teal p-3">
                    <font-awesome-icon v-if="!load" :icon="['fab', 'google']" class="mr-2 text-white" /> 
                    <font-awesome-icon v-else :icon="['fas', 'spinner']" class="mr-2 infi-animation" />
                    <p v-if="!load" class="d-inline text-white">Login MySC using Rinfo</p>
                    <p v-else class="d-inline">Loading...</p>
                </a>
                </GoogleLogin>
                <!-- <p>Not Registered yet ? <router-link to="/register">Create an Account</router-link> </p> -->
            </div>
        </section>
    </div>
   
</template>



<script>
// import Swal from 'sweetalert2'
import GoogleLogin from '@/plugin/sso-google/GoogleLogin'
const CLIENT_ID = "1032966377380-8n63b7jrdaq6p4l8mhkpgqdnfakfvqos.apps.googleusercontent.com"
export default {
    data() {
        return {
            email: "",
            password: "",
            params: {
                client_id: CLIENT_ID
            },
            renderParams: {
                width: 250,
                height: 50,
                longtitle: true
            }
        }
    },
    components: {
        GoogleLogin
    },
    methods: {
        onSuccess(googleUser) {
            console.log(googleUser)
            const accessToken = {
                access_token: googleUser.wc.access_token
            }

            this.$store.dispatch("ssoGoogle", accessToken)

        },
        onFailure(error) {
            console.log(error)
        }
    },
    computed: {
        load() {
            return this.$store.state.status === 'loading'
        }
    },
    created() {
        if(!this.$store.getters.isLogin){
            return
        }
        this.$router.push('/')
    }
}
</script>

<style scoped>
/*General Styles*/

* {
	margin: 0;
	padding: 0;
    box-sizing: border-box;
    
}


html {
	font-size: 16px;
	font-family: "Raleway", sans-serif;
	color: #555;
}

ul,
nav {
	list-style: none;
}

a {
	text-decoration: none;
}

a:hover {
	opacity: 1;
}

a.btn {
	border-radius: 4px;
	text-transform: uppercase;
	font-weight: bold;
	text-align: center;
	background-color: #4caf50;
	opacity: 1;
	transition: all 400ms;
}

a.btn:hover {
	background-color: #fff;
}

section {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40px 80px;
}

section:not(.hero):nth-child(even) {
	background-color: #f5f5f5;
}

.grid {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}

hr {
	width: 250px;
	height: 3px;
	background-color: #4caf50;
	border: 0;
	margin-bottom: 50px;
}

.image-1 {
	background-image: url("https://images.unsplash.com/photo-1505852903341-fc8d3db10436?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&s=e2f72e62d5f4f04256dd9305d5f51f3c");
}

.image-2 {
	background-image: url("https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&s=20b3b1c3caef8c619ac3c75c07a7eafb");
}

.image-3 {
	background-image: url("https://images.unsplash.com/photo-1490576198307-6ff97609a0cc?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&s=a0dbd168637edc2cfdac3715ab23d519");
}

.image-4 {
	background-image: url("https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&s=4f305bbc0243f81f1bf6053a62d76297");
}

section h3.title {
	text-transform: capitalize;
	font: bold 48px "Raleway", sans-serif;
	margin-bottom: 30px;
	text-align: center;
}

section p {
	max-width: 775px;
	line-height: 2;
	padding: 0 20px;
	margin-bottom: 30px;
	text-align: center;
}

/* @media (max-width: 800px) {
	section {
		padding: 30px 20px;
	}
} */

/*Header Styles*/

header {
	position: absolute;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 35px 100px 0;
	animation: 1s fadein 0.5s forwards;
	opacity: 0;
	color: #fff;
	z-index: 2;
}

@keyframes fadein {
	100% {
		opacity: 1;
	}
}

header h2 {
	font-family: "Amatic SC", sans-serif;
}

header nav {
	display: flex;
	margin-right: -15px;
}

header nav li {
	margin: 0 15px;
}

@media (max-width:600px) {
	header {
		padding:20px 50px;
		flex-direction: column;
		margin-left:40px;
	}
}

@media (max-width: 800px) {
	header {
		padding: 20px 50px;
		flex-direction: column;
	}

	header h2 {
		margin-bottom: 15px;
	}
}

/*Hero Styles*/

.hero {
	position: relative;
	justify-content: center;
	text-align: center;
	min-height: 100vh;
	color: #fff;
}

.background-image img {
	position: absolute;
	top: 0;
	left: 0;
	width:100%;
	height: 100%;
	background-size: cover;
	z-index: -1;
	background-color: #80a3db;
}

.hero h1 {
	font: 72px "Amatic SC", sans-serif;
    text-shadow: 2px 2px rgb(0 0 0 / 30%);
    margin-bottom: 15px;
}

.hero h3 {
	font: 28px "Raleway", sans-serif;
	font-weight: 300;
	text-shadow: 2px 2px rgba(0, 0, 0, 0.3);
}

.hero a.btn {
	background:  transparent;
	height:  38px;
	line-height:  35px;
	border:  2px solid white;
	display:  inline-block;
	float:  none;
	text-align:  center;
	padding:  0px!important;
	font-size:  14px;
	color:  #fff;
}
.hero a.btn:hover {
	color:  #fff;
     background:  rgba(255, 255, 255, 0.2);
}
.hero-content-area {
	opacity: 0;
	padding-top:30vh;
	animation: 1s slidefade 1s forwards;
}

@keyframes slidefade {
	100% {
		opacity: 1;
		margin: 0;
	}
}


@media(max-width:660px) {
	.hero {
		min-height:720px;
		min-width: 400px;
	}
}

@media(max-width:400px) {
	.hero {
		min-height:830px;
		min-width:460px;
	}
}

@media (max-width: 800px) {
	.hero h1 {
		font-size: 48px;
	}

	.hero h3 {
		font-size: 24px;
	}

	.hero a.btn {
		padding: 15px 40px;
	}
}

/*Destinations Section*/

.destinations .grid li {
	height: 350px;
	padding: 20px;
	background-clip: content-box;
	background-size: cover;
	background-position: center;
}

.destinations .grid li.small {
	flex-basis: 30%;
}

.destinations .grid li.large {
	flex-basis: 70%;
}

@media (max-width: 1100px) {
	.destinations .grid li.small,
	.destinations .grid li.large {
		flex-basis: 50%;
	}
}

@media (max-width: 800px) {
	.destinations .grid li.small,
	.destinations .grid li.large {
		flex-basis: 100%;
	}
}

/*Packages Section*/

.packages .grid li {
	padding: 50px;
	flex-basis: 50%;
	text-align: center;
}

.packages .grid li i {
	color: #e07e7b;
}

.packages .grid li h4 {
	font-size: 30px;
	margin: 25px 0;
}

@media (max-width: 800px) {
	.packages .grid li {
		flex-basis: 100%;
		padding: 20px;
	}
}

/*Testimonials Section*/

.testimonials .quote {
	font-size: 22px;
	font-weight: 300;
	line-height: 1.5;
	margin: 40px 0 25px;
}

@media (max-width: 800px) {
	.testimonials .quote {
		font-size: 18px;
		margin: 15px 0;
	}

	.testimonials .author {
		font-size: 14px;
	}
}

/*Contact Section*/

.contact form {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	width: 60%;
}

.contact form .btn {
	padding: 18px 42px;
}

.contact form input {
	padding: 15px;
	margin-right: 30px;
	font-size: 18px;
	color: #555;
	flex: 1;
}

@media (max-width: 1000px) {
	.contact form input {
		flex-basis: 100%;
		margin: 0 0 20px 0;
	}
}

/*Footer Section*/

footer {
	display: flex;
	align-items: center;
	justify-content: space-around;
	background-color: #555;
	color: #fff;
	padding: 20px 0;
}

footer ul {
	display: flex;
}

footer ul li {
	margin-left: 16px;
}

footer p {
	text-transform: uppercase;
	font-size: 14px;
	opacity: 0.6;
	align-self: center;
}

@media (max-width: 1100px) {
	footer {
		flex-direction: column;
	}

	footer p {
		text-align: center;
		margin-bottom: 20px;
	}

	footer ul li {
		margin: 0 8px;
	}
}


</style>