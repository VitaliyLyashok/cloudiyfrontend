var Helper ={
    getCookie: function(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    },
    clearCookies: function(){
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
    },
    setCookie: function(name, value, expire) {
        var options = {
            expires: expire ? expire : 336,
            path: "/"
        };
        var expires = options.expires;
    
        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000 * 60 * 60);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }
    
        value = encodeURIComponent(value);
    
        var updatedCookie = name + "=" + value;
    
        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }
    
        document.cookie = updatedCookie;
    },
    deleteCookie: function (name) {
        document.cookie = name + "=;Path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    },
    
}
export default Helper;