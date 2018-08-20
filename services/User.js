import {HTTP} from './Api'

export default {
    checkLogin() {
        _check = async() => {
          try {
            const loginData = await HTTP.post('/user/grant');
            return loginData.data.logged
          } catch(err) {
            console.log('error en login: ', err)
            return false;
          }
        }
        return _check();
    }
}