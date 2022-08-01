import { Account } from "../../Model/Model.js";

document.getElementById("signUp").onclick = function (e) {
  e.preventDefault();

  let isValid = validation();

  if (!isValid) {
    return alert("Vui lòng điền vào các thông tin cần thiết");
  }

  let newAcc = new Account();
  newAcc.email = document.querySelector("#emailClient").value;
  newAcc.name = document.querySelector("#nameClient").value;
  newAcc.password = document.querySelector("#passClient").value;
  newAcc.phone = document.querySelector("#phoneClient").value;

  let genderInput = document.querySelector(
    'input[name="Choose"]:checked'
  ).value;
  if (genderInput === "true") {
    genderInput = true;
  } else {
    genderInput = false;
  }
  newAcc.gender = genderInput;

  let promise = axios({
    url: "https://shop.cyberlearn.vn/api/Users/signup",
    method: "POST",
    data: newAcc,
  });
  promise.then(function (result) {
    alert(result.data.message);
    location.reload();
  });
  promise.catch(function (err) {
    alert(err.response.data.message);
  });
};

function validation() {
  let isValid = document.getElementById("formRegister").checkValidity();
  if (!isValid) {
    let inputEmail = document.getElementById("emailClient");
    let spanEmail = document.getElementById("infEmail");
    if (inputEmail.validity.valueMissing) {
      spanEmail.innerHTML = "Địa chỉ email không được để trống";
    } else if (inputEmail.validity.patternMismatch) {
      spanEmail.innerHTML = "Email không đúng định dạng";
    } else {
      spanEmail.innerHTML = "";
    }
    //Kiểm tra validation tên
    let inputName = document.getElementById("nameClient");
    let spanName = document.getElementById("infName");
    if (inputName.validity.valueMissing) {
      spanName.innerHTML = "Tên không được để trống";
    } else if (inputName.validity.patternMismatch) {
      spanEmail.innerHTML = "Tên không đúng định dạng";
    } else {
      spanName.innerHTML = "";
    }

    //Kiểm tra validation password
    let inputPass = document.getElementById("passClient");
    let spanPass = document.getElementById("infPass");
    if (inputPass.validity.valueMissing) {
      spanPass.innerHTML = "Mật khẩu không được để trống";
    } else if (inputPass.validity.patternMismatch) {
      spanPass.innerHTML =
        "Mật khẩu phải từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)";
    } else {
      spanPass.innerHTML = "";
    }
    // Kiểm tra mật khẩu  confirm

    let inputPassConfirm = document.getElementById("passConfirm");
    let spanPassConfirm = document.getElementById("infPassConfirm");
    if (inputPassConfirm.validity.valueMissing) {
      spanPassConfirm.innerHTML = "Xác nhận mật khẩu không được để trống";
    } else if (inputPass.value !== inputPassConfirm.value) {
      spanPassConfirm.innerHTML =
        "Xác nhận mật khẩu không trùng khớp với mật khẩu đã nhập";
    } else {
      spanPassConfirm.innerHTML = "";
    }
    // Kiểm tra điện thoại hợp lệ
    let inputPhone = document.getElementById("phoneClient");
    let spanPhone = document.getElementById("infPhone");
    if (inputPhone.validity.valueMissing) {
      spanPhone.innerHTML =
        "Số điện thoại không được để trống không được để trống";
    } else if (inputPhone.validity.patternMismatch) {
      spanPhone.innerHTML = "Số điện thoại không đúng định dạng";
    } else {
      spanPhone.innerHTML = "";
    }
    let inputSelect = document.querySelector('input[name="Choose"]:checked');
    let spanSelect = document.getElementById("infSelect");
    if (inputSelect === null) {
      spanSelect.innerHTML = "Vui lòng chọn giới tính";
    } else {
      spanSelect.innerHTML = "";
    }
  } else {
    let inputPassConfirm = document.getElementById("passConfirm");
    let spanPassConfirm = document.getElementById("infPassConfirm");
    let inputPass = document.getElementById("passClient");
    if (inputPassConfirm.value === undefined) {
      spanPassConfirm.innerHTML = "Xác nhận mật khẩu không được để trống";
      isValid = false;
    } else if (inputPass.value !== inputPassConfirm.value) {
      spanPassConfirm.innerHTML =
        "Xác nhận mật khẩu không trùng khớp với mật khẩu đã nhập";
      isValid = false;
    } else {
      spanPassConfirm.innerHTML = "";
    }
  }
  return isValid;
}
