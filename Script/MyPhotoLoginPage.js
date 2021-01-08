var users = [{
    username: 'Yancey',
    password: 'Yancey'
}];
var page = ['Yancey.html'];
var index = users.includes('uname') && users.includes('pswd');

if (index !== -1) {
    window.open(page[index])
}
else {
    alert("username or password is not correct/用户名或密码错误")
}