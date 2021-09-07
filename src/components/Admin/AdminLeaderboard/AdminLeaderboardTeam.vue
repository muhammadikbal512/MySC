<script>
import axios from 'axios'
export default {
    data () {
        return {
            mahasiswa:'',
            latest_rank: '',
            rank:'',
            teams: '',
            id: ''
        }
    },
    methods: {
        getTeam() {
            axios.get('https://dev.alphabetincubator.id/mysc-backend/public/api/teams')
            .then(response => {
                console.log(response)
                this.teams  =   response.data.dropdown_list
            })
        },
        getRecordTeam() {
            axios.post('https://dev.alphabetincubator.id/mysc-backend/public/api/user/experience/team/' + this.id)
            .then(response => {
                console.log(response)
                this.mahasiswa = response.data.details
            })
        },

    },
    mounted () {
        this.getTeam()
    }
}
</script>
<template>
    <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            <div class="content-header text-center">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col">
                            <h1 class="m-0 text-dark mb-1">Top Ranking</h1>
                        </div>
                    </div><!-- /.row -->
                     <router-link to="/admin/leaderboard" class="btn btn-app bg-olive mr-2">Student Rank</router-link>
                    <router-link to="/admin/leaderboard/dosen" class="btn btn-app bg-indigo mr-2">Lecturer Rank</router-link>
                    <router-link to="/admin/leaderboard/team" class="btn btn-app bg-maroon mr-2">Team Rank</router-link>
                </div><!-- /.container-fluid -->
            </div>
            <!-- /.content-header -->

            <!-- Main content -->
            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-12 mt-3">
                            <label>Pilih Team</label>
                                <select class="custom-select" v-model="id" >
                                    <option v-for="index in teams"
                                     :key="index.id" :value="index.id">
                                        {{index.team}}
                                    </option>
                                </select>
                            <button @click="getRecordTeam()" style="margin:10px;" class="btn btn-success">Submit</button>
                        </div>
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-header border-0">
                                    <h3 class="card-title">Top 10</h3>
                                </div>
                                <div class="card-body table-responsive p-0">
                                    <table class="table table-striped table-valign-middle">
                                        <thead>
                                            <tr>
                                                <th style="padding: 0; width: 7rem"></th>
                                                <th style="padding: 0; width: 40%"></th>
                                                <th style="padding: 0;"></th>
                                                <th style="padding: 0"></th>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            <tr v-for="(value, length) in mahasiswa" :key="value.id" style="cursor: pointer; text-decoration:none;" data-toggle="modal" data-target>
                                                <td>{{ length + 1 }}</td>
                                                <td>
                                                    <router-link :to="{name: 'view-profile', params: {id: value.detail_user.id, email: value.detail_user.email}}">
                                                        <img :src="value.detail_user.media.path" class="img-circle img-size-32 mr-2">
                                                        {{ value.detail_user.name }}
                                                    </router-link>
                                                </td>
                                                <td>{{ value.total_sc }} SC</td>
                                                <td>{{ value.claimaic }} Redeemed AIC</td>
                                                <td>{{ value.level.name }} Tier</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                <!-- /.container-fluid -->
                </div>
            <!-- /.content -->
            </div>
             <a id="back-to-top" href="#" class="btn btn-primary back-to-top" role="button" aria-label="Scroll to top">
        <font-awesome-icon icon="chevron-up" />
    </a>
        </div>
        
</template>

<style scoped>
.main-footer {
bottom: 0;
left: 0;
position: relative;
width:100%;
text-align: center;
right: 0;
z-index: 999;
}

@keyframes glowing {
  0% { box-shadow: 0 0 -10px #c4a300; }
  40% { box-shadow: 0 0 20px #c4a300; }
  60% { box-shadow: 0 0 20px #c4a300; }
  100% { box-shadow: 0 0 -10px #c4a300; }
}

.button-glow {
  animation: glowing 5000ms infinite;
  
}
</style>