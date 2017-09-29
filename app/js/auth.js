//test1111@gmail.com

const reg = function (e) {
    e.preventDefault();
    let data = {
        email: $('#reg_email').val(),
        password: $('#reg_password').val(),
        firstName: $('#reg_firstname').val(),
        lastName: $('#reg_lastname').val()
    }
    console.log(data);
    $.ajax({
        type: 'POST',
        url: 'http://10.10.10.193:3000/user/reg',
        data: data
    }).then(res => {
        localStorage.setItem('authorization', res.token);
        console.log(res);
    }).catch(
        err => console.log(err)
    )
}

const login = function (e) {
    e.preventDefault();
    let data = {
        email: $('#login_email').val(),
        password: $('#login_password').val()
    }
    console.log('from front-end', data);
    const token = localStorage.getItem('authorization');
    $.ajax({
        type: 'POST',
        url: 'http://10.10.10.193:3000/user/login',
        data: data
    }).then(
        res => {
            localStorage.setItem('authorization', res.token);
            console.log('response', res);
            onAuth(res);
        }
    ).catch(
        err => {
            console.log(err)
        }
    )
}

const onAuth = function (data) {
    loadUserData(data.token)
        .then(
            res => {
                localStorage.setItem('user', JSON.stringify(res));
                loadUserLocalData();
            }
        )
}

const loadUserData = function (token) {
    return $.ajax({
        type: 'GET',
        beforeSend: function (req) {
            req.setRequestHeader('authorization', token);
        },
        url: 'http://10.10.10.193:3000/user'
    })
}

const loadUserLocalData = function () {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('userdata from localstorage', user);
    let fullname = 'visitor';
    if (user) {
        fullname = `${user.firstName} ${user.lastName}`;
    }

    $('#fullname').text(fullname);

}