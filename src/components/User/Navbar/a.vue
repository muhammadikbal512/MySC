<style>
    .menu-open a p svg {
        transform: rotate(-90deg);
    }
    .hi-dropdown{
        position: relative;
    }
    .hi-dropdown-content{
        position: absolute;
        top: 50%;
        left: -85%;
        transform: translateY(-50%);
        display: none;
        z-index: 1;
    }
    .hi-dropdown-content p{
        cursor: pointer
    }
    .hi-dropdown:hover .hi-dropdown-content{
        display: block;
        animation: ani-logout .3s ease-out;
    }
    @keyframes ani-logout {
        from {
            transform: translateX(30%) translateY(-50%);
            opacity: 0;
        }
        to {
            transform: translateX(0) translateY(-50%);
            opacity: 1;
        }
    }

    .featurette-divider {
    margin: 5rem 0;
    }
</style>

<template>
    <div class="wrapper">
        <!-- Navbar -->
        <nav class="main-header navbar navbar-expand navbar-white navbar-light" style="background-color: #619E85">
            <!-- Left navbar links -->
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="#" style="color: #fff">
                        <font-awesome-icon icon="bars" />
                    </a>
                </li>
                <li class="nav-item d-none d-sm-inline-block">
                    <router-link to="/" class="nav-link" style="color: #fff">Home</router-link>
                </li>
                <li class="nav-item d-none d-sm-inline-block">
                    <router-link to="/historysc" class="nav-link" style="color: #fff">MyHistory</router-link>
                </li>
                 <li class="nav-item d-none d-sm-inline-block">
                    <router-link to="/profile" class="nav-link" style="color: #fff">Profile</router-link>
                </li>
                <div v-show="this.role === 'admin'">
                <li class="nav-item d-none d-sm-inline-block">
                    <router-link to="/admin" class="nav-link" style="color: #fff">Secret Chamber</router-link>
                </li>
                </div>
            </ul>

            <!-- Right navbar links -->
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <div class="hi-dropdown">
                        <a @click="logout()" class="nav-link" data-widget="control-sidebar" data-slide="true" href="#" style="color: #fff">
                            <font-awesome-icon icon="sign-out-alt" />
                        </a>
                        <div class="hi-dropdown-content">
                            <p @click="logout()" class="m-0 text-white">Logout</p>
                        </div>
                    </div>
                </li>
            </ul>
        </nav>
    <!-- /.navbar -->


        <router-view />
        <hr class="featurette-divider">
       <!-- Main Footer -->
            <footer class="main-footer text-center">
                <strong>Copyright 2021 <a href="https:/mysc.alphabetincubator.id" target="_blank">Universitas Raharja</a> | All Rights Reserved | Powered by <a href="https://alphabetincubator.id/">Alphabet Incubator</a> | Build With Love</strong>
            </footer>
<!-- ./wrapper -->
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
    data() {
        return {
            role : this.$store.state.user.role
        }
    },

    methods: {
        logout() {
            Swal.fire({
                text: "Are you sure to logout?",
                imageUrl: "https://lh3.googleusercontent.com/-_niVlPvfWVk/YHhNZZNpOMI/AAAAAAAABgE/sQDKxIcsyRIXwYmkMQTRHKu-smSQYUF-QCK8BGAsYHg/s0/2021-04-15.png?authuser=0",
                imageWidth: 150,
                imageHeight: 60,
                showCancelButton: true,
                confirmButtonColor: '#27a745',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
            })
                .then(result => {
                    if(result.value) {
                        Swal.fire(
                            {
                        imageUrl: "https://lh3.googleusercontent.com/-_niVlPvfWVk/YHhNZZNpOMI/AAAAAAAABgE/sQDKxIcsyRIXwYmkMQTRHKu-smSQYUF-QCK8BGAsYHg/s0/2021-04-15.png?authuser=0",
                        imageWidth: 150,
                        imageHeight: 60,
                        text:'Success',
                        confirmButtonColor:'#27a745'
                            }
                        )
                        this.$store.dispatch('logout')
                    }
                })
        }
    },
    async created() {
        await axios.post('https://dev.alphabetincubator.id/mysc-backend/public/api/auth/user')
            .then(response => {
                console.log(response)
                this.name = response.data.User.Detail_user.name
                this.photo = response.data.User.Media[0].path
                this.$store.dispatch('addDataUser', response.data.User)                
            })
            .catch(error => {
                if(error){
                    Swal.fire({
                        imageUrl: "https://lh3.googleusercontent.com/-_niVlPvfWVk/YHhNZZNpOMI/AAAAAAAABgE/sQDKxIcsyRIXwYmkMQTRHKu-smSQYUF-QCK8BGAsYHg/s0/2021-04-15.png",
                        imageWidth: 150,
                        imageHeight: 60,
                        text: 'Your token has been expired!.'
                    })
                    this.$store.dispatch('logout')
                    return
                }
            })
    }
}
</script>
