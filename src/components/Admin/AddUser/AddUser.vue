<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  data() {
    return {
      teams: [],
      email: "",
      name: "",
      team: ""
    };
  },
  methods: {
    submit() {
      const addUser = {
        name: this.name,
        email: this.email,
        team: this.team
      };
      // console.log(questData)
      Swal.fire({
        title: "Are you sure want to add this User ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then(result => {
        if (result.value) {
          axios
            .post(
              "https://dev.alphabetincubator.id/mysc-backend/public/api/secretchamber/users/create",
              addUser
            )
            .then(response => {
              console.log(response);
              Swal.fire("Success!", "User has been Added");
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    }
  },
  created() {
    axios
      .get("https://dev.alphabetincubator.id/mysc-backend/public/api/secretchamber/teams")
      .then(response => {
        console.log(response);
        this.teams = response.data.dropdown_list;
      });
  }
};
</script>

<template>
  <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-12">
            <h1 class="m-0 text-dark">Add User</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-olive">
              <div class="card-header">
                <!-- <h3 class="card-title">BBC</h3> -->
              </div>
              <div class="card-body">
                <form role="form">
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          placeholder="Ex : iqbal@raharja.info"
                          class="form-control"
                          v-model="email"
                        />
                      </div>
                      <div class="form-group">
                        <label>Name</label>
                        <input
                          type="email"
                          placeholder="Ex : Muhammad Iqbal"
                          class="form-control"
                          v-model="name"
                        />
                      </div>
                      <div class="form-group">
                        <label>Team</label>
                        <select class="form-control select2" style="width: 100%;" v-model="team">
                          <option
                            v-for="(index) in teams"
                            :key="index.id"
                            :value="index.id"
                          >{{ index.team }}</option>
                        </select>
                      </div>
                      <div class="card-footer">
                        <button @click="submit" class="btn btn-primary" type="submit">Submit</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>