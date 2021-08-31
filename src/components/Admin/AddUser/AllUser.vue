<script>
import axios from 'axios'
import Button from './Button'
import Swal from 'sweetalert2'
import { OrbitSpinner } from 'epic-spinners'
// const swalWithBootstrap = Swal.mixin({
//     customClass: {
//         confirmButton: 'btn btn-success py-2 px-4',
//         cancelButton : 'btn btn-danger py-2 px-4 mx-3'
//     },
//     buttonsStyling: false
// })


export default {
    components: {
        OrbitSpinner,
        Button
    },
    data() {
        return {
            dataArray: '',
            loading: false,
            page: 1,
            search: '',
            showButton : false,
            teams: [],
            name: '',
            email:'',
            team: ''
        }
    },
    methods: {
        toggleAddTask() {
            this.showButton = !this.showButton
        },
        delete_user(id) {
            Swal.fire({
                text: "Are you sure want to delete this user ?",
                // imageUrl: "https://lh3.googleusercontent.com/-_niVlPvfWVk/YHhNZZNpOMI/AAAAAAAABgE/sQDKxIcsyRIXwYmkMQTRHKu-smSQYUF-QCK8BGAsYHg/s0/2021-04-15.png?authuser=0",
                // imageWidth: 150,
                // imageHeight: 60,
                showCancelButton: true,
                confirmButtonColor: '#27a745',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!',
                reverseButtons: true
            })  .then(result => {
                    if(result.value) {
                        axios.delete('http://localhost:8000/api/secretchamber/user/delete/' + id)
                            .then(response => {
                                console.log(response)
                                Swal.fire(
                                    'Success!',
                                    'User has been deleted',
                                )
                                this.getRecords();
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    }
            })
        },
        submit() {
            const data = {
                name: this.name,
                email: this.email,
                team:this.team,
            }
            // console.log(questData)
            Swal.fire({
                text: "Are you sure ?",
                // imageUrl: "https://lh3.googleusercontent.com/-_niVlPvfWVk/YHhNZZNpOMI/AAAAAAAABgE/sQDKxIcsyRIXwYmkMQTRHKu-smSQYUF-QCK8BGAsYHg/s0/2021-04-15.png?authuser=0",
                // imageWidth: 150,
                // imageHeight: 60,
                showCancelButton: true,
                confirmButtonColor: '#27a745',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!',
                reverseButtons: true
            })  .then(result => {
                    if(result.value) {
                        axios.post('https://dev.alphabetincubator.id/mysc-backend/public/api/users/create', data)
                            .then(response => {
                                console.log(response)
                                Swal.fire(
                                    'Success!',
                                    'User has been Added',
                                )
                                    this.getRecords()
                                    this.name = ''
                                    this.email = ''
                                    this.team = ''
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    }
            })
        },
        prevPage () {
            this.loading = true
            this.page--
            axios.get('https://dev.alphabetincubator.id/mysc-backend/public/api/secretchamber/show/mahasiswa?page=' + this.page)
                .then(response => {
                    this.dataArray = response.data.details,
                    // console.log(response)
                    this.page = this.dataArray.current_page
                    this.loading = false
                })
            },
        nextPage () {
            this.loading = true
            this.page++
            axios.get('https://dev.alphabetincubator.id/mysc-backend/public/api/secretchamber/show/mahasiswa?page=' + this.page)
                .then(response => {
                    this.dataArray = response.data.details,
                    // console.log(response)
                    this.page = this.dataArray.current_page
                    this.loading = false
                })
        },
        getRecords() {
            this.loading = true
            axios.get('https://dev.alphabetincubator.id/mysc-backend/public/api/users?page=')
            .then(response => {
                console.log('users',response)
                this.dataArray = response.data,
                this.page = this.dataArray.current_page
                this.loading = false
            })
        },
        getTeams() {
             axios.get('http://localhost:8000/api/teams')
            .then(response => {
                console.log(response)
               this.teams = response.data.dropdown_list
            })
        }
    },
    mounted() {
      this.getRecords()
      this.getTeams()
    },
    computed: {
            filteredgetRecords: function() {
                return this.dataArray.filter((value)=> {
                    return value.name.match(this.search)
                })
            },
        }
}

</script>

<template>
    <div class="content-wrapper">
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-12" style="justify-content:space-between; display:flex;">
                        <h1 class="m-0 text-dark">All User</h1>
                        <Button 
                            @toggle-add-user="toggleAddTask" 
                            :text="showButton ? 'Close' : 'Add User'" 
                            :color="showButton ? 'red' : 'green'" />
                    </div>
                    <div v-show="showButton" class="col-sm-12">
                         <div class="form-group">
                            <label>Email</label>
                            <input type="email" v-model="email" placeholder="Ex : iqbal@raharja.info" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Name</label>
                            <input type="email" v-model="name" placeholder="Ex : Muhammad Iqbal" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Team</label>
                            <select class="form-control select2" v-model="team" style="width: 100%;" >
                                <option v-for="(index) in teams" :key="index.id" :value="index.id">{{ index.team }}</option>
                            </select>
                        </div>
                         <div class="col-12">
                            <button @click="submit" class="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="overlay" v-if="loading">
                                <orbit-spinner style="display: block; margin: auto"
                                        :animation-duration="1200"
                                        :size="55"
                                        color="black"
                                        />
                            </div>
                            <div class="card-body table-responsive p-0">
                                <input type="text" v-model="search" style="margin-bottom:20px;" placeholder="search">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(value, length) in filteredgetRecords" :key="value.id">
                                            <td>{{ length + 1 }}.</td>
                                            <td>{{ value.name }}</td>
                                            <td>{{ value.email }}</td>
                                            <td>{{ value.role.name }}</td>
                                            <td>
                                                <button @click="delete_user(value.id)" class="btn btn-sm btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- Pagination -->
                            <div class="my-4"> 
                                <ul class="pagination pagination-md justify-content-center text-center">
                                    <li class="page-item"
                                        :class="dataArray.current_page === 1 ? 'disabled' : ''"
                                    >
                                        <a class="page-link" @click="prevPage">
                                            Previous
                                        </a>
                                    </li>
                                    <li class="page-link" style="background-color: inherit"> 
                                        {{ dataArray.current_page }} of {{ dataArray.last_page }}
                                    </li>
                                    <li  class="page-item" 
                                        :class="dataArray.current_page === dataArray.last_page ? 'disabled' : ''"
                                    >
                                        <a class="page-link" @click="nextPage">
                                            Next
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
a:hover {
    cursor: pointer;
}
@keyframes spinner {
    to { transform: rotate(360deg); }
}
.fa-spinner {
    animation: spinner 1s linear infinite;
}

.active {
    background-color: teal;
}
</style>