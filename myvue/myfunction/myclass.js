function mynew(sup){
    let sub = Object.create(null);
    sub.__proto__=Object.create(sup.prototype);
    sup.call(sub,...arguments);
    return sup
}