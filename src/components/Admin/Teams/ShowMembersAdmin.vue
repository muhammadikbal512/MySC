<script>
import axios from 'axios'
// import { OrbitSpinner } from 'epic-spinners'
// const swalWithBootstrap = Swal.mixin({
//     customClass: {
//         confirmButton: 'btn btn-success py-2 px-4',
//         cancelButton : 'btn btn-danger py-2 px-4 mx-3'
//     },
//     buttonsStyling: false
// })


export default {
    components: {
        // OrbitSpinner,
    },
   data() {
       return {
        members: '',
        //  loading: false,
       }
   },
   methods: {
       getMembers() {
           axios.post('https://dev.alphabetincubator.id/mysc-backend/public/api/show/team/' + this.$route.params.id)
           .then(response => {
               console.log(response)
               this.members = response.data.team
           })
       }
      
   },
   created() {
       this.getMembers();
   }
}

</script>

<template>
    <div class="content-wrapper">
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-12" style="justify-content:space-between; display:flex;">
                        <h1 class="m-0 text-dark">Show Members</h1>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <!-- <div class="overlay" v-if="loading">
                                <orbit-spinner style="display: block; margin: auto"
                                        :animation-duration="1200"
                                        :size="55"
                                        color="black"
                                        />
                            </div> -->
                            <div class="card-body table-responsive p-0">
                                <!-- <input type="text" v-model="search" style="margin-bottom:20px;" placeholder="search"> -->
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Team</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(value, length) in members " :key="value.id">
                                           <td>{{ length + 1 }}</td>
                                           <td>
                                               <router-link :to="{name: 'view-profile', params: {id:value.id, email:value.email}}">
                                                <img class="img-circle img-size-32 mr-2" :src="value.media.path">
                                               </router-link>
                                            </td>
                                           <td>{{ value.name }}</td>
                                           <td>{{ value.team.team }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- Pagination -->
                            <!-- <div class="my-4"> 
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
                            </div> -->
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