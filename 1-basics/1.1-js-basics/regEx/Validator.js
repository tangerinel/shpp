let Validator = {
validateEmail : function (email){
let regEx = /^[A-Za-z0-9][A-Za-z0-9+.-]{1,19}@[\w.!$%&’*+/=?^-]{1,15}\.[a-z]{1,5}$/g;
return regEx.test(email);
},
validatePhone : function (phone){
    if (phone.length > 25 ) return false;
    let regEx = /^([\s-]*\+[\s-]*3[\s-]*8)?(([\s-]*0[\s-]*[1-9][\s-]*([\s-]*\d[\s-]*){8})|([\s-]*\([\s-]*0[\s-]*[1-9][\s-]*\d[\s-]*\)([\s-]*\d[\s-]*){7}))$/g;
    return regEx.test(phone);
},
validatePassword : function(password){
    if(password.length  < 8) return false;
    let regEx = /^(?=\w*[a-z])(?=\w*[A-Z])(?=\w*\d)\w*$/g;
    return regEx.test(password);
}
};