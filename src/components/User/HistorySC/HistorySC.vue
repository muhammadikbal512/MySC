<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import Datepicker from 'vuejs-datepicker'
export default {
    data() {
        return {
            all : '',
            pending: '',
            verified: '',
            rejected: '',
            total_sc: '',
            date: new Date()
        }
    },

    components: {
        Datepicker
    },

    methods:{
        Submit() {
            this.loading = true
            const tanggal = String(this.date)
            const baru = tanggal.split(' ')
            let bulan 
            switch (baru[1]){
                case  "Jan":
                bulan = '01';
                break;
                case  "Feb":
                bulan = '02';
                break;
                case  "Mar":
                bulan = '03';
                break;
                case  "Apr":
                bulan = '04';
                break;
                case  "May":
                bulan = '05';
                break;
                case  "Jun":
                bulan = '06';
                break;
                case  "Jul":
                bulan = '07';
                break;
                case  "Aug":
                bulan = '08';
                break;
                case  "Sep":
                bulan = '09';
                break;
                case  "Oct":
                bulan = '10';
                break;
                case  "Nov":
                bulan = '11';
                break;
                case  "Des":
                bulan = '12';
                break;
                default: 
                bulan = null
                break;   
            }
            
            const lala = [baru[3], bulan, baru[2]].join('-')
            console.log(lala)
            axios.post('https://dev.alphabetincubator.id/mysc-backend/public/api/user/records/show/pending/' + this.$store.state.user.id, {date:lala})
                .then(response => {
                    console.log('tanggal',response)
                    // const dataRes =  response.data.Data
                    // this.all_data = [].slice.call(dataRes).sort((a,b) => (a.detail_record.id > b.detail_record.id) ? 1 : -1)
                    // // console.log('tanggal ambil data',this.all_data)
                    // this.loading = false
                })
                .catch(error => {
                    console.log(error)
                    Swal.fire({
                                position: 'center',
                                imageUrl: "https://lh3.googleusercontent.com/-L0L0yfE5VpA/XpfifMdyIXI/AAAAAAAABFU/ZrtQpPoKXHsAj0kgc70Gn8IwWsybi0nbACK8BGAsYHg/s0/2020-04-15.png",
                                imageWidth: 150,
                                imageHeight: 60,
                                text: 'There is no record',
                                showConfirmButton: false,
                                timer: 1500
                            })
                })
        }
    },


    mounted (){
        axios.get('https://dev.alphabetincubator.id/mysc-backend/public/api/user/experience/user')
      .then(response => {
        console.log(response)
        this.total_sc = response.data.total_sc
      })

        axios.get('https://dev.alphabetincubator.id/mysc-backend/public/api/user/records/show/pending')
            .then(response => {
                console.log('pending', response)
                this.pending = response.data.detail_record
            })
            .catch(error => {
                console.log(error)
                
            })

        axios.get('https://dev.alphabetincubator.id/mysc-backend/public/api/user/records/show/approved')
            .then(response => {
                console.log('approved', response)
                this.verified = response.data.detail_record
            })
            .catch(error => {
                console.log(error)
                
            })

        axios.get('https://dev.alphabetincubator.id/mysc-backend/public/api/user/records/show/rejected')
            .then(response => {
                console.log('rejected', response)
                this.rejected = response.data.detail_record
            })
            .catch(error => {
                console.log(error)
                
            })
        
        

        // //for showing all Pending Records
        // axios.get('https://dev.alphabetincubator.id/mysc-backend/public/api/user/records/pending')
        // .then(response => {
        //     this.pending = response.data
        // })

        // //for showing all Verified Records
        // axios.get('https://dev.alphabetincubator.id/mysc-backend/public/api/user/records/verified')
        // .then(response => {
        //     console.log('verified', response)
        //     this.verified = response.data
        // })

        // //For showing all Denied Records
        // axios.get('https://dev.alphabetincubator.id/mysc-backend/public/user/api/records/rejected')
        // .then(response => {
        //     console.log('denied', response)
        // })
    }
}
</script>

<template>
    <div class="content-wrapper" style="background-color:white; min-height:100vh;">
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-12">
                        <h1 class="m-0 text-dark">MySC History</h1>
                        <h5 class="mt-2">Total SC :{{ this.total_sc }}</h5>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header p-2">
                                <h3 class="card-title">Submitted SC</h3>
                                <div class="card-tools">
                                    <div class="input-group input-group-sm"> 
                                        <label>
                                            <datepicker v-model="date">
                                            </datepicker>
                                        </label>
                                        <button @click="Submit()" class="btn btn-sm btn-primary ml-4">Submit</button>
                                    </div>
                                    <ul class="nav nav-pills">
                                        <li class="nav-item">
                                            <a class="nav-link active" href="#pending" data-toggle="tab">Pending</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#approved" data-toggle="tab">Approved</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#denied" data-toggle="tab">Denied</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="tab-content">
                                    <div class="active tab-pane" id="pending">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                <th>No</th>
                                                <th>User</th>
                                                <th>Link</th>
                                                <th>Submitted at</th>
                                                <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(value, length) in pending" :key="value.id">
                                                    <td>{{ length + 1 }}</td>
                                                    <td>{{ value.user.name }}</td>
                                                    <td>{{ value.link }}</td>
                                                    <td>{{ value.created_at }}</td>
                                                    <td>{{ value.status }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="tab-pane" id="approved">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                <th>No</th>
                                                <th>User</th>
                                                <th>Link</th>
                                                <th>Submitted at</th>
                                                <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(value, length) in verified" :key="value.id">
                                                    <td>{{ length + 1 }}</td>
                                                    <td>{{ value.user.name }}</td>
                                                    <td>{{ value.link }}</td>
                                                    <td>{{ value.created_at }}</td>
                                                    <td>{{ value.status }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                        <div class="tab-pane" id="denied">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                <th>No</th>
                                                <th>User</th>
                                                <th>Link</th>
                                                <th>Submitted at</th>
                                                <th>Decision</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(value, length) in rejected" :key="value.id">
                                                    <td>{{ length + 1 }}</td>
                                                    <td>{{ value.user.name }}</td>
                                                    <td>{{ value.link }}</td>
                                                    <td>{{ value.created_at }}</td>
                                                    <td>{{ value.status }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-tools {
    float: right;
    margin-right: -.625rem;
}
.card-title {
    float: left;
    font-size: 1.1rem;
    font-weight: 400;
    margin: 0;
    padding-top: 10px;
}
</style>