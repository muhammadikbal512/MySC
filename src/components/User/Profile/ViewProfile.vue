<script>
import axios from 'axios'
export default {
    data() {
        return {
            name: this.$store.state.user.name,
            photo: this.$store.state.user.photo,
            role: this.$store.state.user.role,
            id: this.$store.state.user.id,
            mahasiswa: '',
            all: '',
            pending: '',
            verified : '',
            exp: '',
            badge: '',
            user: ''
        }
    },
    created() {
      axios.get('https://dev.alphabetincubator.id/mysc-backend/public/api/user/experience/user/' + this.$route.params.id)
      .then(response => {
        console.log(response)
        this.mahasiswa = response.data
      })

      axios.get('https://dev.alphabetincubator.id/mysc-backend/public/api/user/user/' + this.$route.params.id)
      .then(response=> {
        console.log('user', response)
        this.user = response.data
      })

      
    },
    mounted() {
      //Get Level
      axios.get('https://dev.alphabetincubator.id/mysc-backend/public/api/user/experience/user/' + this.$route.params.id + '/progress')
      .then(response => {
        this.exp = response.data
        this.badge = response.data.badge

        console.log('exp', this.exp)
      })
    }
}
</script>

<template>
  <div class="content-wrapper">
    <div class="content">
      <div class="container-fluid">
        <div class="row">
            <div class="col-6 mx-auto">
                <div class="card card-primary card-outline mt-5">
                  <div class="card-body box-profile">
                    <div class="widget-user-image" style="margin-left: 0;">
                      <img :src="this.exp.detail_level.media.path" style="border: none; width: 50px; cursor: pointer" data-toggle="modal" data-target="#tier">
                      
                    </div>
                    <div class="text-center">
                      <img class="img-fluid profile-user-img" style="border-radius:50%;" :src="this.mahasiswa.media">
                    </div>

                    <h3 class="profile-username text-center">{{this.mahasiswa.detail_exp.user.name}}</h3>

                    <p class="text-muted text-center">{{ this.user.role.name }} - {{this.user.team}}</p>

                    <p class="text-muted text-center">{{this.mahasiswa.detail_exp.total_sc}} / {{ this.exp.detail_level.max_value }} | {{ this.exp.detail_level.name }}</p>

                    <ul class="list-group list-group-unbordered mb-3">
                      <li class="list-group-item" style="background-color:green; color:white; padding:5px;">
                        <b>Claim SC</b> <a class="float-right">{{ this.mahasiswa.detail_exp.total_sc }}</a>
                      </li>
                      <li class="list-group-item" style="background-color:black; color:white; padding:5px;">
                        <b>AIC</b> <a class="float-right">{{ this.mahasiswa.detail_exp.total_aic }}</a>
                      </li>
                      <li class="list-group-item" style="background-color:green; color:white; padding:5px;">
                        <b>Redeemed AIC</b> <a class="float-right">{{ this.mahasiswa.detail_exp.claimaic }}</a>
                      </li>
                    </ul>

                    <!-- <router-link tag ="button" to="/submitsc" class="btn btn-success btn-block"><b>Submit SC</b></router-link> -->
                    
                    <!-- <router-link tag="button" :disabled="mahasiswa.total_aic === 0" to="/submitaic" class="btn btn-success btn-block"><b>Claim AIC</b></router-link> -->
                  </div>
                  <!-- /.card-body -->
                </div>
            </div>
        </div>
      </div>
      <div class="modal fade" id="tier" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog mw-100 w-75" role="document">
          <div class="modal-content">
            <div class="modal-header text-center" style="margin:auto;">
              <h5 class="modal-title" id="exampleModalLabel">Tier Lists</h5>
            </div>
            <div class="modal-body">
              <div class="row text-center">
                <div class="col-md-3">
                  <img src="@/assets/img/iron.png" alt="">
                  <p>Iron</p>
                  <p>0 / 10</p>
                  </div>
                <div class="col-md-3"> 
                  <img src="@/assets/img/bronze.png" alt="">
                  <p>Bronze</p>
                  <p>11 / 20</p>
                </div>
                <div class="col-md-3"> 
                  <img src="@/assets/img/Silver.png" alt="">
                  <p>Silver</p>
                  <p>21 / 30</p>
                  </div>
                <div class="col-md-3"> 
                  <img src="@/assets/img/Gold.png" alt="">
                  <p>Gold</p>
                  <p>31 / 40</p>
                </div>
              </div>
              <div class="row text-center">
                <div class="col-md-3"> 
                  <img src="@/assets/img/Platinum.png" alt="">
                  <p>Platinum</p>
                  <p>41 / 50</p>
                </div>
                <div class="col-md-3"> 
                  <img src="@/assets/img/Emerald.png" alt="">
                  <p>Emerald</p>
                  <p>51 / 60</p>
                </div>
                <div class="col-md-3"> 
                  <img src="@/assets/img/Diamond.png" alt="">
                  <p>Diamond</p>
                  <p>61 / 70</p>
                </div>
                <div class="col-md-3"> 
                  <img src="@/assets/img/Master.png" alt="">
                  <p>Master</p>
                  <p>71 / 80</p>
                </div>
              </div>
               <div class="row text-center">
                <div class="col-md-6"> 
                  <img src="@/assets/img/Grandmaster.png" alt="">
                  <p>Grandmaster</p>
                  <p>81 / 90</p>
                </div>
                <div class="col-md-6"> 
                  <img src="@/assets/img/Challanger.png" alt="">
                  <p>Challanger</p>
                  <p>91 / 100</p>
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
.profile-user-img {
    border: 3px solid #adb5bd;
    margin: 0 auto;
    padding: 3px;
    width: 100px;
}
.body {
    background-color:white !important;
}
</style>