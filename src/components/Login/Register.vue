<template>
    <div class="container">
        <div class="row content">
            <div class="col-md-6 mb-3">
                <img src="../../assets/rocket.svg" class="img-fluid" alt="image">
            </div>
            <div class="col-md-6">
                <h3 class="signin-text mb-3">Register</h3>
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" placeholder="Enter email">
                        <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" placeholder="Password">
                    </div>
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="inputGroupSelect01">Role</label>
                    </div>
                    <select class="custom-select">
                        <option value="1">Dosen</option>
                        <option value="2">Mahasiswa</option>
                    </select>
                    </div>
                    <button type="submit" class="btn btn-class">Submit</button>
                    </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
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