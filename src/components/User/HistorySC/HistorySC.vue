<script>
import axios from 'axios'
import Datepicker from 'vuejs-datepicker'
// import Swal from 'sweetalert2'
export default {
    components: {
        Datepicker
    },
    data() {
        return {
            all_data: '',
            user_id: this.$store.state.user.id,
            value:'',
            date: new Date()
        }
    },

    methods: {
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
            axios.post('https://dev.alphabetincubator.id/rep-backend/public/api/user/difficulty/user/1', {date:lala})
                .then(response => {
                    console.log('tanggal',response)
                    const dataRes =  response.data.Data
                    this.all_data = [].slice.call(dataRes).sort((a,b) => (a.detail_record.id > b.detail_record.id) ? 1 : -1)
                    // console.log('tanggal ambil data',this.all_data)
                    this.loading = false
                })
                // .catch(error => {
                //     Swal.fire({
                //                 position: 'center',
                //                 imageUrl: "https://lh3.googleusercontent.com/-L0L0yfE5VpA/XpfifMdyIXI/AAAAAAAABFU/ZrtQpPoKXHsAj0kgc70Gn8IwWsybi0nbACK8BGAsYHg/s0/2020-04-15.png",
                //                 imageWidth: 150,
                //                 imageHeight: 60,
                //                 text: 'There is no record',
                //                 showConfirmButton: false,
                //                 timer: 1500
                //             })
                // })
        }
    },
    
    mounted (){
        axios.post('https://dev.alphabetincubator.id/rep-backend/public/api/user/difficulty/user/1')
            .then(response => {
                // console.log(response)
                this.all_data = response.data.Data
            })
            // .catch(error => {
                
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
                        <h1 class="m-0 text-dark">Daily Quests History</h1>
                        <h5 class="mt-2">Total ECP : {{value.value}} / 11</h5>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-tools" style="float:left;">
                                    <div class="input-group input-group-sm"> 
                                        <label>
                                            <datepicker v-model="date">
                                            </datepicker>
                                        </label>
                                        <button @click="Submit()" class="btn btn-sm btn-primary ml-4">Submit</button>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body table-responsive p-0">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Quest Name</th>
                                            <th>Submit Date</th>
                                            <th>Point</th>
                                            <th>Link</th>
                                            <th>Likes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(index, length) in all_data" :key="length">
                                            <td>{{ length + 1 }}</td>
                                            <td>{{ index.quest }}</td>
                                            <td>{{ index.detail_record.created_at }}</td>
                                            <td>{{index.detail_record.value}}</td>
                                            <td><a :href="index.detail_record.link">Click Here</a></td>
                                            <td>
                                                <font-awesome-icon :icon="['fa', 'thumbs-up']" />
                                                {{ index.likes }}
                                             </td>
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
</template>