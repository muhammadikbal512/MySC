<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import router from '../../router'
export default {
    data() {
        return {
            roles: [],
            email: '',
            name: '',
            password: '',
            role_id: ''
        }
    },
    methods: {
        Submit() {
            const register = {
                name: this.name,
                email: this.email,
                role_id: this.role_id,
                password: this.password
            }
            console.log(register)
            Swal.fire({
                title: 'Are you sure ?',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
            }).then(result => {
                if(result.value) {
                    axios.post('http://localhost:8000/api/users/', register)
                    .then(response => {
                        console.log(response)
                        Swal.fire(
                            'Success'
                        )
                        router.push('/login')
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
            })
        },
    },
    created() {
        axios.get('http://localhost:8000/api/users/create')
        .then(response => {
            console.log(response)
            this.roles = response.data.dropdown_list
        })
    }
}
</script>



<template>
    <div class="content-wrapper">
        <div class="container">
            <div class="row content">
                <div class="col-md-6 mb-3">
                    <img src="../../assets/rocket.svg" class="img-fluid" alt="image">
                </div>
                <div class="col-md-6">
                    <h3 class="signin-text mb-3">Register</h3>
                    <form @submit.prevent="Submit">
                        <div class="form-group">
                            <label>Email address</label>
                            <input type="email" class="form-control" placeholder="Enter email" v-model="email">
                            <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" placeholder="Enter Name" v-model="name">
                            <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" class="form-control" placeholder="Password" v-model="password">
                        </div>
                        <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="inputGroupSelect01">Role</label>
                        </div>
                        <select class="custom-select" v-model="role_id">
                            <option v-for="index in roles" :key="index.id" :value="index.id">
                                {{index.name}}
                            </option>
                        </select>
                        </div>
                        <button type="submit" class="btn btn-class">Submit</button>
                        <small class="ml-5">Already have an account? <router-link to="/login">Sign in</router-link></small>
                        </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.content {
    margin:8%;
    background-color: #fff;
    padding: 4rem 1rem 4rem 1rem;
    box-shadow: 0 0 5px 5px rgb(0,0,0 0.5);

}
.signin-text {
    font-style: normal;
    font-weight: 600 !important;

}

.container {
    padding: 2rem;
}

.content-wrapper {
    height: 100vh;
    background-color:#42b983;
}
/* .body {
    /* background-color:#42b983 !important; */

.form-control {
    display: block;
    width: 100%;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    border-color: #42b983 !important;
    border-style: solid !important;
    border-width: 0 0 1px 0 !important;
    padding: 0px !important;
    color: #495057;
    height: auto;
    border-radius:0;
    background-color: #fff;
    background-clip: padding-box;
}

.form-control:focus {
    color: #42b983;
    background-color: #fff;
    border-color: #fff;
    outline: 0;
    box-shadow: none;
}

.btn-class {
    border-color:#42b983;
    color:#42b983;
}

.btn-class:hover {
    background-color: #42b983;
    color: #fff;
}
</style>