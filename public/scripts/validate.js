// check username
// let signupForm = $(".sign-up-form");
let username = $('input[name=name]');

username.keyup(function () {
    checkName();
});


function checkName() {

    let error = $(username).next();
    let value = $(username).val().trim();
    if (value === "") {
        error.text("Ho tên không được để trống");
        $(username).addClass("is-invalid");
        return false;
    } else {
        $(username).removeClass("is-invalid");
        return true;
    }
}
// check email
const email = $('input[name=email]');
email.blur(function () {
    checkEmail(this);
});
function checkEmail(email) {
    let error = $(email).next();
    let value = $(email).val().trim();
    let validRegex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    if (value.length == "") {
        error.text("Vui lòng điền email");
        $(email).addClass("is-invalid");
        return false;
    } else if (!value.match(validRegex)) {
        error.text("Email không hợp lệ");
        $(email).addClass("is-invalid");
        return false;
    } else {
        $(email).removeClass("is-invalid");
        return true;
    }
}
//check phone
let phone = $('input[name=phone]');;
phone.keyup(function () {
    checkPhone();
});

function checkPhone() {
    let error = $(phone).next();
    let value = $(phone).val().trim();
    let validRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (value.length == "") {
        error.text("Vui lòng điền số điện thoại");
        $(phone).addClass("is-invalid");
        return false;
    } else if (!value.match(validRegex)) {
        error.text("Số điện thoại sai định dạng");
        $(phone).addClass("is-invalid");
        return false;
    } else {
        $(phone).removeClass("is-invalid");
        return true;
    }
}
//check Password
let password = $('input[name=password]');
password.keyup(function () {
    checkPassword(this);
});

function checkPassword(password) {
    let error = $(password).next();
    let value = $(password).val().trim();
    let validRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (value.length == "") {
        error.text("Vui lòng điền mật khẩu");
        $(password).addClass("is-invalid");
        return false;
    } else
        if (!value.match(validRegex)) {
            error.text("Mật khẩu phải từ 8 ký tự trở lên chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số,  1 ký tự đặc biệt");
            $(password).addClass("is-invalid");
            return false;
        } else {
            $(password).removeClass("is-invalid");
            return true;
        }
}
// checkconPass

let conPassword = $('input[name=conPassword]');
conPassword.keyup(function () {
    checkConPassword();
});

function checkConPassword() {
    let error = $(conPassword).next();
    let passwordValue = $(password).val().trim();
    let conPasswordValue = $(conPassword).val().trim();
    if (passwordValue !== conPasswordValue) {
        error.text("Nhập lại mật khẩu chưa đúng");
        $(conPassword).addClass("is-invalid");
        return false;
    } else {
        $(conPassword).removeClass("is-invalid");
        return true;
    }
}
// check register validate

$('.sign-up-form #submitBtn').click(function (event) {
    let signupEmail = $('.sign-up-form input[name=email]');
    let signupPass =$('.sign-up-form input[name=password]')
    checkName();
    checkEmail($(signupEmail));
    checkPhone();
    checkPassword($(signupPass)); checkConPassword();
    if (
        !checkName() ||
        !checkPassword($(signupPass)) ||
        !checkPhone() ||
        !checkEmail($(signupEmail)) || !checkConPassword()
    ) {
        event.preventDefault();
    }
    else {

    }
});

// check validate login 

$('#login-btn').click(function (event) {
    let loginEmail = $('.login-form input[name=email]');
    let loginPass =$('.login-form input[name=password]')
    checkEmail($(loginEmail));
    checkPassword($(loginPass)); 
    if (
        !checkEmail($(loginEmail)) ||
        !checkPassword($(loginPass))
    ) {
        event.preventDefault();
    }
    else {

    }
});
//check forget password
$('#recover-pass-btn').click(function (event) {
    let recoverEmail = $('.recover-pass-form input[name=email]');
    checkEmail($(recoverEmail));
    if (
        !checkEmail($(recoverEmail))
    ) {
        event.preventDefault();
    }
    else {

    }
});