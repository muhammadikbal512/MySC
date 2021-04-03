<template>
    <div class="container">
        <div class="row content">
            <div class="col-md-6 mb-3">
                <img src="../../assets/desk.svg" class="img-fluid" alt="image">
            </div>
            <div class="col-md-6 text-center" style="margin-top:15%;">
                <div class="login-box">
                    <div class="login-logo">
                        <div class="text">
                            <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure" :logoutButton="false" class="social-auth-links text-center mb-3">
                                <a href="#" class="btn btn-block bg-teal p-3">
                                    <font-awesome-icon v-if="!load" :icon="['fab', 'google']" class="mr-2 text-white" /> 
                                    <font-awesome-icon v-else :icon="['fas', 'spinner']" class="mr-2 infi-animation" />
                                    <p v-if="!load" class="d-inline text-white">Login MySC using Rinfo</p>
                                    <p v-else class="d-inline">Loading...</p>
                                </a>
                            </GoogleLogin>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GoogleLogin from '@/plugin/sso-google/GoogleLogin'
const CLIENT_ID = "1040958847983-mt1h043vfn6cs6ts1akmfgb2f3ecvm72.apps.googleusercontent.com"
export default {
    data() {
        return {
            email: "",
            password: "",
            params: {
                client_id: CLIENT_ID
            },
            renderParams: {
                width: 250,
                height: 50,
                longtitle: true
            }
        }
    },
    components: {
        GoogleLogin
    },
    methods: {
        onSuccess(googleUser) {
            console.log(googleUser)
            const accessToken = {
                access_token: googleUser.tc.access_token
            }

            this.$store.dispatch("ssoGoogle", accessToken)

        },
        onFailure(error) {
            console.log(error);
        }
    },
    computed: {
        load() {
            return this.$store.state.status === 'loading'
        }
    },
    created() {
        if(!this.$store.getters.isLogin){
            return
        }
        this.$router.push('/')
    }
}
</script>

<style scoped>
.bg-teal {
    background-color: #20c997!important;
}
.content {
    margin:8%;
    background-color: #fff;
    padding: 4rem 1rem 4rem 1rem;
    box-shadow: 0 0 5px 5px rgb(0,0,0 0.5);

}
.signin-text {
    font-style: normal;
    font-weight: 600 !important;

}

.form-control {
    display: block;
    width: 100%;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    border-color: #42b983 !important;
    border-style: solid !important;
    border-width: 0 0 1px 0 !important;
    padding: 0px !important;
    color: #495057;
    height: auto;
    border-radius:0;
    background-color: #fff;
    background-clip: padding-box;
}

.form-control:focus {
    color: #42b983;
    background-color: #fff;
    border-color: #fff;
    outline: 0;
    box-shadow: none;
}

.btn-class {
    border-color:#42b983;
    color:#42b983;
}

.btn-class:hover {
    background-color: #42b983;
    color: #fff;
}
</style>