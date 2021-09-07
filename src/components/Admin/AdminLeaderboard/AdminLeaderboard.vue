<script>
import axios from 'axios'
export default {
    data () {
        return {
            mahasiswa:'',
            latest_rank: '',
            rank:'',
            dosen: '',
            id: ''
        }
    },
    methods: {
        getDosen() {
            axios.get('https://dev.alphabetincubator.id/mysc-backend/public/api/users/dosen')
            .then(response => {
                console.log(response)
                this.dosen  =   response.data.dropdown_list
            })
        },
        getRecordDosen() {
            axios.post('https://dev.alphabetincubator.id/mysc-backend/public/api/user/experience/dosen/' + this.id)
            .then(response => {
                console.log(response)
                this.mahasiswa = response.data.details
                this.rank = this.mahasiswa
            })
        },
        getSC() {
            axios.get('https://dev.alphabetincubator.id/mysc-backend/public/api/user/experience/sc')
            .then(response => {
                console.log(response)
            })
        }

    },
    mounted () {
        axios.get('https://dev.alphabetincubator.id/mysc-backend/public/api/user/experience/mahasiswa')
        .then(response => {
            console.log(response)
            this.mahasiswa = response.data.details
            let res = response.data.details
            this.rank = res.sort((a, b) => (a.total_sc < b.total_sc) ? 1 : (a.total_sc === b.total_sc) ?
            ((a.detail_user.name > b.detail_user.name) ? 1 : -1) : -1)

            console.log('rank', this.rank)
            let a = [...this.rank]
            a.splice(0, 3)
            this.latest_rank = a
            
            console.log('latest', this.latest_rank)
        });
        this.getDosen();
        this.getSC();
        
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
                        <div class="col-md-4">
                            <router-link style="color:black;" :to="{name: 'view-profile', params: {id: this.rank[1].detail_user.id, email: this.rank[1].detail_user.email}}">
                                <div class="card card-widget widget-user">
                                    <!-- Add the bg color to the header using any of the bg-* classes -->
                                    <div class="widget-user-header" style="background-color:#C0C0C0;">
                                        <h3 class="widget-user-username text-center">RANK 2</h3>
                                        <h5 class="widget-user-desc text-center">{{ this.rank[1].detail_user.name }}</h5>
                                    </div>
                                    <div class="widget-user-image">
                                        <img class="img-circle elevation-2 text-center" :src="this.rank[1].detail_user.media.path" alt="User Avatar">
                                    </div>
                                    <div style="position: absolute; top: 0" class="widget-user-badge">
                                        <img style="width: 60px" :src="this.rank[1].level.media.path" alt="badge">
                                    </div>
                                    <div class="card-footer">
                                        <div class="row">
                                        <div class="col-sm-4 border-right">
                                            <div class="description-block">
                                            <h5 class="description-header">{{ this.rank[1].total_sc }}</h5>
                                            <span>SC</span>
                                            </div>
                                            <!-- /.description-block -->
                                        </div>
                                        <!-- /.col -->
                                        <div class="col-sm-4 border-right">
                                            <div class="description-block">
                                            <h5 class="description-header">{{ this.rank[1].claimaic }}</h5>
                                            <span>Redeemed AIC</span>
                                            </div>
                                            <!-- /.description-block -->
                                        </div>
                                        <!-- /.col -->
                                        <div class="col-sm-4">
                                            <div class="description-block">
                                            <h5 class="description-header">{{ this.rank[1].level.name }}</h5>
                                            <span>Tier</span>
                                            </div>
                                            <!-- /.description-block -->
                                        </div>
                                        <!-- /.col -->
                                        </div>
                                        <!-- /.row -->
                                    </div>
                                </div>
                            </router-link>
                        </div>
                        <div class="col-md-4">
                            <router-link style="color:black;" :to="{name: 'view-profile', params: {id: this.rank[0].detail_user.id, email: this.rank[0].detail_user.email}}">
                                <div class="card card-widget widget-user">
                                    <!-- Add the bg color to the header using any of the bg-* classes -->
                                    <div class="widget-user-header" style="background-color:#FFD700;">
                                        <h3 class="widget-user-username text-center">RANK 1</h3>
                                        <h5 class="widget-user-desc text-center">{{ this.rank[0].detail_user.name }}</h5>
                                    </div>
                                    <div class="widget-user-image">
                                        <img class="img-circle elevation-2 text-center" :src="this.rank[0].detail_user.media.path" alt="User Avatar">
                                    </div>
                                    <div style="position: absolute; top: 0" class="widget-user-badge">
                                            <img style="width: 60px" :src="this.rank[0].level.media.path" alt="badge">
                                    </div>
                                    <div class="card-footer">
                                        <div class="row">
                                        <div class="col-sm-4 border-right">
                                            <div class="description-block">
                                            <h5 class="description-header">{{ this.rank[0].total_sc }}</h5>
                                            <span>SC</span>
                                            </div>
                                            <!-- /.description-block -->
                                        </div>
                                        <!-- /.col -->
                                        <div class="col-sm-4 border-right">
                                            <div class="description-block">
                                            <h5 class="description-header">{{ this.rank[0].claimaic }}</h5>
                                            <span>Redeemed AIC</span>
                                            </div>
                                            <!-- /.description-block -->
                                        </div>
                                        <!-- /.col -->
                                        <div class="col-sm-4">
                                            <div class="description-block">
                                            <h5 class="description-header">{{ this.rank[0].level.name }}</h5>
                                            <span>Tier</span>
                                            </div>
                                            <!-- /.description-block -->
                                        </div>
                                        <!-- /.col -->
                                        </div>
                                        <!-- /.row -->
                                    </div>
                                </div>
                            </router-link>
                        </div>
                        <div class="col-md-4">
                            <router-link style="color:black;" :to="{name: 'view-profile', params: {id: this.rank[2].detail_user.id, email: this.rank[2].detail_user.email}}">
                                <div class="card card-widget widget-user">
                                    <!-- Add the bg color to the header using any of the bg-* classes -->
                                    <div class="widget-user-header" style="background-color:#CD7F32;">
                                        <h3 class="widget-user-username text-center">RANK 3</h3>
                                        <h5 class="widget-user-desc text-center">{{ this.rank[2].detail_user.name }}</h5>
                                    </div>
                                    <div class="widget-user-image">
                                        <img class="img-circle elevation-2 text-center" :src="this.rank[2].detail_user.media.path" alt="User Avatar">
                                    </div>
                                    <div style="position: absolute; top: 0" class="widget-user-badge">
                                        <img style="width: 60px" :src="this.rank[2].level.media.path" alt="badge">
                                    </div>
                                    <div class="card-footer">
                                        <div class="row">
                                        <div class="col-sm-4 border-right">
                                            <div class="description-block">
                                            <h5 class="description-header">{{ this.rank[2].total_sc }}</h5>
                                            <span>SC</span>
                                            </div>
                                            <!-- /.description-block -->
                                        </div>
                                        <!-- /.col -->
                                        <div class="col-sm-4 border-right">
                                            <div class="description-block">
                                            <h5 class="description-header">{{ this.rank[2].claimaic }}</h5>
                                            <span>Redeemed AIC</span>
                                            </div>
                                            <!-- /.description-block -->
                                        </div>
                                        <!-- /.col -->
                                        <div class="col-sm-4">
                                            <div class="description-block">
                                            <h5 class="description-header">{{ this.rank[2].level.name }}</h5>
                                            <span>Tier</span>
                                            </div>
                                            <!-- /.description-block -->
                                        </div>
                                        <!-- /.col -->
                                        </div>
                                        <!-- /.row -->
                                    </div>
                                </div>
                            </router-link>
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
                                                <th style="padding: 0; width: 50%"></th>
                                                <th style="padding: 0;"></th>
                                                <th style="padding: 0;"></th>
                                                <th style="padding: 0"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(value, length) in latest_rank" :key="value.id" style="cursor: pointer; text-decoration:none;" data-toggle="modal" data-target>
                                                <td>{{ length + 4 }}</td>
                                                <td>
                                                    <router-link style="color:black;" :to="{name: 'view-profile', params: {id: value.detail_user.id, email: value.detail_user.email}}">
                                                        <img :src="value.detail_user.media.path" class="img-circle img-size-32 mr-2">
                                                        {{ value.detail_user.name }}
                                                    </router-link>
                                                </td>
                                                <!-- <td>{{ value.detail_user.team.team }}</td> -->
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