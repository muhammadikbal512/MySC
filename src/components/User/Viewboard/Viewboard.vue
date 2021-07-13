<template>
    <div class="row">
        <div class="col-6 mx-auto">
            <div class="card card-primary card-outline mt-5">
              <div class="card-body box-profile">
                <div class="text-center">
                  <img class="img-fluid profile-user-img" style="border-radius:50%;" :src="this.photo">
                </div>

                <h3 class="profile-username text-center">{{this.name}}</h3>

                <p class="text-muted text-center">{{this.role}}</p>

                <ul class="list-group list-group-unbordered mb-3">
                  <li class="list-group-item">
                    <b>SC</b> <a class="float-right">{{ this.mahasiswa.total_sc }}</a>
                  </li>
                  <li class="list-group-item">
                    <b>AIC</b> <a class="float-right">{{ this.mahasiswa.total_aic }}</a>
                  </li>
                </ul>

                <router-link to="/submitsc" class="btn btn-primary btn-block"><b>Submit SC</b></router-link>
                 <router-link to="/submitaic" class="btn btn-info btn-block"><b>Claim AIC</b></router-link>
              </div>
              <!-- /.card-body -->
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            name: this.$store.state.user.name,
            photo: this.$store.state.user.photo,
            role: this.$store.state.user.role,
            mahasiswa: '',
            all: '',
            pending: '',
            verified : ''
        }
    },
    created() {
      axios.get('https://dev.alphabetincubator.id/mysc-backend/public/api/user/experience/user')
      .then(response => {
        console.log(response)
        this.mahasiswa = response.data
      })
    },
    mounted() {
      axios.get('https://dev.alphabetincubator.id/mysc-backend/public/api/user/experience/sc')
      .then(response => {
        console.log(response)
      })
    }
}
</script>



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