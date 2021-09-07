<script>
import axios from 'axios'
// import Swal from 'sweetalert2'
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
        OrbitSpinner
    },
    data() {
        return {
            dataArray: '',
            loading: false,
            page: 1,
            search: '',
        }
    },
    methods: {
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
            axios.get('https://dev.alphabetincubator.id/mysc-backend/public/api/secretchamber/show/mahasiswa?page=')
            .then(response => {
                console.log('history own',response)
                this.dataArray = response.data.details,
                this.page = this.dataArray.current_page
                this.loading = false
            })
        },
    },
    mounted() {
      this.getRecords()
    },
    computed: {
            filteredgetRecords: function() {
                return this.dataArray.filter((value)=> {
                    return value.detail_user.name.match(this.search)
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
                    <div class="col-sm-12">
                        <h1 class="m-0 text-dark">Give SC</h1>
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
                                <input type="text" v-model="search" style="margin:20px;" placeholder="search">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Name</th>
                                            <th>Total SC</th>
                                            <th>Total AIC</th>
                                            <th>Redeemed AIC</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(value, length) in filteredgetRecords" :key="value.id">
                                            <td>{{ length + 1 }}.</td>
                                            <td>{{ value.detail_user.name }}</td>
                                            <td>{{ value.total_sc }}</td>
                                            <td>{{ value.total_aic }}</td>
                                            <td>{{ value.claimaic }}</td>
                                            <td>
                                                <router-link :to="{name: 'give-sc', params: {id: value.detail_user.id, name: value.detail_user.name}}">
                                                    <button type="button" class="btn btn-success btn-sm mr-3">Give SC</button>
                                                </router-link>
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
         <a id="back-to-top" href="#" class="btn btn-primary back-to-top" role="button" aria-label="Scroll to top">
        <font-awesome-icon icon="chevron-up" />
    </a>
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
</style>