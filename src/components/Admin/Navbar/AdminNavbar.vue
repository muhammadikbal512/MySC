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
                <a class="nav-link" data-widget="pushmenu" href="#" style="color:white;" role="button">
                    <font-awesome-icon icon="bars" />
                </a>
            </li>
        </ul>
            <ul class="navbar-nav">
                <router-link to="/" class="navbar-brand">
                    <img src="@/assets/img/mysc.png" alt="MySC Logo" class="brand-image img-circle elevation-3" style="opacity: .8; height: 30px;">
                    <span class="brand-text font-weight-light" style="color:white;">MySC</span>
                </router-link>
                <li class="nav-item d-none d-sm-inline-block">
                    <router-link to="/admin" class="nav-link" style="color: #fff">Home</router-link>
                </li>
                <li class="nav-item d-none d-sm-inline-block">
                    <router-link to="/admin/givesc" class="nav-link" style="color: #fff">Give SC</router-link>
                </li>
                 <li class="nav-item d-none d-sm-inline-block">
                    <router-link to="/admin/user" class="nav-link" style="color: #fff">User</router-link>
                </li>
                 <li class="nav-item d-none d-sm-inline-block">
                    <router-link to="/admin/teams" class="nav-link" style="color: #fff">Teams</router-link>
                </li>
                <li class="nav-item d-none d-sm-inline-block">
                    <router-link to="/admin/leaderboard" class="nav-link" style="color: #fff">Leaderboard</router-link>
                </li>
                <!-- <div v-show="this.role === 'admin'">
                <li class="nav-item d-none d-sm-inline-block">
                    <router-link to="/admin" class="nav-link" style="color: #fff">Secret Chamber</router-link>
                </li>
                </div> -->
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
                <li class="nav-item">
                    <a class="nav-link" data-widget="fullscreen" href="#" role="button" style="color: #fff">
                        <font-awesome-icon icon="expand-arrows-alt" />
                    </a>
                </li>
            </ul>
        </nav>

        

        <aside class="main-sidebar sidebar-dark-teal elevation-4" style="background-color: rgb(97,158,133);">
            <router-link to="/admin" class="brand-link elevation-4">
                <img src="@/assets/img/mysc.png" alt="MySC Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
                <span class="brand-text font-weight-light">MySC</span>
            </router-link>
            <div class="sidebar">
                <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div class="image">
                        <img class="img-circle elevation-2" :src="this.photo" alt="">
                    </div>
                    <div class="info">
                        <p style="color:white;" class="d-block">{{ this.name }}</p>
                    </div>
                </div>
            </div>
            <nav class="mt-2">
                    <ul class="nav nav-pills nav-sidebar flex-column nav-child-indent" data-widget="treeview" role="menu" data-accordion="false">
                    <!-- Add icons to the links using the .nav-icon class
                        with font-awesome or any other icon font library -->
                        <!-- <li class="nav-item user-panel pb-2" style="border-color: #fff">
                            <router-link to="/profile" class="nav-link text-white">
                                <font-awesome-icon :icon="['fas', 'user-circle']" class="nav-icon" />
                                <p>
                                    My Viewboard
                                </p>
                            </router-link>
                        </li> -->
                        <li class="header mt-3 mb-1" style="color: rgba(255,255,255,.7)">Menu Navigation</li>
                        
                        <li class="nav-item">
                            <router-link to="/admin" class="nav-link text-white" style="cursor: pointer">
                            <p>
                                <font-awesome-icon icon="home" class="nav-icon" />
                                <p>Home</p>
                            <!-- </p> -->
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/admin/givesc" class="nav-link text-white" style="cursor: pointer">
                            <p>
                                <font-awesome-icon icon="history" class="nav-icon" />
                                <p>Give SC</p>
                            <!-- </p> -->
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/admin/user" class="nav-link text-white" style="cursor: pointer">
                            <p>
                                <font-awesome-icon icon="user" class="nav-icon" />
                                <p>User</p>
                            <!-- </p> -->
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/admin/teams" class="nav-link text-white" style="cursor: pointer">
                            <p>
                                <font-awesome-icon icon="users" class="nav-icon" />
                                <p>Teams</p>
                            <!-- </p> -->
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/admin/leaderboard" class="nav-link text-white" style="cursor: pointer">
                            <p>
                                <font-awesome-icon icon="chalkboard-teacher" class="nav-icon" />
                                <p>Leaderboard</p>
                            <!-- </p> -->
                            </router-link>
                        </li>

                    </ul>
                </nav>
        </aside>


        <router-view />
       <!-- Main Footer -->
            <footer class="main-footer text-center">
                <strong>Copyright 2021 <a href="https:/mysc.alphabetincubator.id" target="_blank">Universitas Raharja</a> | All Rights Reserved | Powered by <a href="https://alphabetincubator.id/">Alphabet Incubator</a> | Build With Love ❤️</strong>
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
            role : this.$store.state.user.role,
            name: '',
            photo: ''
        }
    },

    mounted () {
        document.body.classList.add('sidebar-mini layout-navbar-fixed sidebar-closed sidebar-collapse')
        axios.get('https://dev.alphabetincubator.id/mysc-backend/public/api/user/experience/sc')
      .then(response => {
        console.log(response)
      })
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
