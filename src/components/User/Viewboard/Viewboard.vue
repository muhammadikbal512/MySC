<template>
    <div class="row">
        <div class="col-6 mx-auto">
            <div class="card card-primary card-outline mt-5">
              <div class="card-body box-profile">
                <div class="text-center">
                  <img class="img-fluid profile-user-img" style="border-radius:50%;" src="https://lh3.googleusercontent.com/-gSyIeGNr8_I/YECEy0-D27I/AAAAAAAABdM/psP-xcR9Nek3HrXjGgzWcSM2z3eUq6VrwCK8BGAsYHg/s512/2021-03-03.jpg" alt="User profile picture">
                </div>

                <h3 class="profile-username text-center">Muhammad Iqbal</h3>

                <p class="text-muted text-center">Timur 10</p>

                <ul class="list-group list-group-unbordered mb-3">
                  <li class="list-group-item">
                    <b>SC</b> <a class="float-right">20</a>
                  </li>
                  <li class="list-group-item">
                    <b>AIC</b> <a class="float-right">100</a>
                  </li>
                </ul>

                <router-link to="/submitsc" class="btn btn-primary btn-block"><b>Submit SC</b></router-link>
              </div>
              <!-- /.card-body -->
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
</style>