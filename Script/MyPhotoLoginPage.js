function checkPswd() {
    var v1 = (0.8 * Math.pow(10, 9));
    var v2 = (0.8 * 0.9 * Math.pow(10, 8));
    var v3 = (0.5 * Math.pow(10, 6));
    var v4 = (Math.pow(0.2, 3) * Math.pow(10, 7));
    var v5 = (0.7 * Math.pow(10, 4));
    var v6 = (0.3 * 0.3 * 1.1 * Math.pow(10, 4));
    var v7 = Math.sqrt(9);
    var P = v1 + v2 + v3 + v4 + v5 + v6 + v7;
    var ip = document.getElementById("pswd").value;
    if (ip == P) {
        window.location = "/Page/MyPhoto/Yancey.html";
    }
    else {
        alert("wrong password/密码错误");
    }
}