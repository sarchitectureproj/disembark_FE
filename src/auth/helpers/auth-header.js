// tutorial from
//https://jasonwatmore.com/post/2018/07/14/vue-vuex-user-registration-and-login-tutorial-example
// used for https request
export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}