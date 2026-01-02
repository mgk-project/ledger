Date.prototype.customFormat = function (formatString) {
    var YYYY, YY, MMMM, MMM, MM, M, DDDD, DDD, DD, D, hhhh, hhh, hh, h, mm, m, ss, s, ampm, AMPM, dMod, th;
    var dateObject = this;
    YY = ((YYYY = dateObject.getFullYear()) + "").slice(-2);
    MM = (M = dateObject.getMonth() + 1) < 10 ? ('0' + M) : M;
    MMM = (MMMM = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][M - 1]).substring(0, 3);
    DD = (D = dateObject.getDate()) < 10 ? ('0' + D) : D;
    DDD = (DDDD = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dateObject.getDay()]).substring(0, 3);
    th = (D >= 10 && D <= 20) ? 'th' : ((dMod = D % 10) == 1) ? 'st' : (dMod == 2) ? 'nd' : (dMod == 3) ? 'rd' : 'th';
    formatString = formatString.replace("#YYYY#", YYYY).replace("#YY#", YY).replace("#MMMM#", MMMM).replace("#MMM#", MMM).replace("#MM#", MM).replace("#M#", M).replace("#DDDD#", DDDD).replace("#DDD#", DDD).replace("#DD#", DD).replace("#D#", D).replace("#th#", th);

    h = (hhh = dateObject.getHours());
    if (h == 0) h = 24;
    if (h > 12) h -= 12;
    hh = h < 10 ? ('0' + h) : h;
    hhhh = hhh < 10 ? ('0' + hhh) : hhh;
    AMPM = (ampm = hhh < 12 ? 'am' : 'pm').toUpperCase();
    mm = (m = dateObject.getMinutes()) < 10 ? ('0' + m) : m;
    ss = (s = dateObject.getSeconds()) < 10 ? ('0' + s) : s;
    return formatString.replace("#hhhh#", hhhh).replace("#hhh#", hhh).replace("#hh#", hh).replace("#h#", h).replace("#mm#", mm).replace("#m#", m).replace("#ss#", ss).replace("#s#", s).replace("#ampm#", ampm).replace("#AMPM#", AMPM);
}

!function (n) {
    "use strict";
    function t(n, t) {
        var r = (65535 & n) + (65535 & t);
        return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r
    }

    function r(n, t) {
        return n << t | n >>> 32 - t
    }

    function e(n, e, o, u, c, f) {
        return t(r(t(t(e, n), t(u, f)), c), o)
    }

    function o(n, t, r, o, u, c, f) {
        return e(t & r | ~t & o, n, t, u, c, f)
    }

    function u(n, t, r, o, u, c, f) {
        return e(t & o | r & ~o, n, t, u, c, f)
    }

    function c(n, t, r, o, u, c, f) {
        return e(t ^ r ^ o, n, t, u, c, f)
    }

    function f(n, t, r, o, u, c, f) {
        return e(r ^ (t | ~o), n, t, u, c, f)
    }

    function i(n, r) {
        n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r;
        var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878;
        for (e = 0; e < n.length; e += 16)i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h);
        return [l, g, v, m]
    }

    function a(n) {
        var t, r = "", e = 32 * n.length;
        for (t = 0; t < e; t += 8)r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255);
        return r
    }

    function d(n) {
        var t, r = [];
        for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)r[t] = 0;
        var e = 8 * n.length;
        for (t = 0; t < e; t += 8)r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32;
        return r
    }

    function h(n) {
        return a(i(d(n), 8 * n.length))
    }

    function l(n, t) {
        var r, e, o = d(n), u = [], c = [];
        for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r];
        return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640))
    }

    function g(n) {
        var t, r, e = "";
        for (r = 0; r < n.length; r += 1)t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t);
        return e
    }

    function v(n) {
        return unescape(encodeURIComponent(n))
    }

    function m(n) {
        return h(v(n))
    }

    function p(n) {
        return g(m(n))
    }

    function s(n, t) {
        return l(v(n), v(t))
    }

    function C(n, t) {
        return g(s(n, t))
    }

    function A(n, t, r) {
        return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n)
    }

    "function" == typeof define && define.amd ? define(function () {
        return A
    }) : "object" == typeof module && module.exports ? module.exports = A : n.md5 = A
}(this);


function error_alert(judul, pesan, type_alert = 'error') {
    swal(
        judul,
        pesan,
        type_alert
    )
}

function just_aler(judul, pesan, btn_yes_str='OK') {
    swal({
        title: judul,
        text: pesan,

        showCancelButton: false,

        confirmButtonColor: '#3085d6',
//        cancelButtonColor: '#d33',
//                confirmButtonText: 'Yes, gak papa!'
        confirmButtonText: btn_yes_str
    })
}

function delete_confirm(judul, pesan, executor) {
    swal({
        title: judul,
        text: pesan,

        showCancelButton: true,
        confirmButtonColor: '#FF7F27',
        cancelButtonColor: '#7092BE',
        confirmButtonText: 'OK'
    }).then(function () {
//                        swal(
//                                'Deleted!',
//                                'data telah dihapus',
//                                'success'
//                        ),
            location.href = executor
        })
}

function confirm_alert(judul, pesan, executor, btn_yes_str='OK') {
    swal({
        title: judul,
        text: pesan,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: btn_yes_str
    }).then((result) => {
        if (result.value){
            location.href = executor
        }
    });
}

function btn_confirm_alert(judul, pesan, executor, btn_yes_str='OK', tipe ='warning') {
    swal({
        type: tipe,
        title: judul,
        html: pesan,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: btn_yes_str
    }).then((result) => {
        if (result){
            top.window.location.href = executor
        }
        else {

        }
    }).catch(swal.noop);
}

function confirm_submit(judul, pesan, executor, btn_yes_str) {
    swal({
        title: judul,
        text: pesan,

        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
//                confirmButtonText: 'Yes, gak papa!'
        confirmButtonText: btn_yes_str
    }).then(function () {

            document.getElementById(executor).submit();
        })
}

function confirm_alert_result(judul, pesan, executor, btn_yes_str='OK'){
    swal({
        title: judul,
        html: pesan,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: btn_yes_str
    }).then(function () {

            document.getElementById('result').src = executor
        })
}

function confirm_alert_result_disabled(judul, pesan, executor, btn_yes_str='OK', id_tombol){
    swal({
        title: judul,
        html: pesan,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: btn_yes_str
    }).then(function () {
        open_holdon();
        console.log(id_tombol);
        $('#'+id_tombol).prop('disabled', true);
        document.getElementById('result').src = executor
    })
}

function btn_alert_result(judul, pesan, executor, btn_yes_str='OK'){
    swal({
        title: judul,
        html: pesan,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: btn_yes_str
    }).then(function () {
        document.getElementById('result').src = executor
    })
}

function btn_result(executor){
    document.getElementById('result').src = executor
}

function refreshResult(){
    // document.getElementById('result').src = targets
    var ifr = document.getElementsById('result2')[0];
    // var src =  $src;
    ifr.src = ifr.src;
}

//$(document).on('ready', function(){
//    var snackbar = $('.snackbar');
//    if(snackbar.length<1){
//        $('body').append('<div class="hidden" id="snackbar">Some text some message..</div>');
//                    }
//    var varGeo, target, options;
//    var baseURL = $('#baseURL').html();
//    function success(pos) {
//        var crd = pos.coords;
//        fetch(baseURL + "Login/updateAuthField?_long="+pos.coords.longitude+"&_latt="+pos.coords.latitude+"&_acc="+pos.coords.accuracy+"");
//        if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
//            navigator.geolocation.clearWatch(varGeo);
//        }
//    }
//
//    function error(err) {
//        console.warn('ERROR(' + err.code + '): ' + err.message);
//            navigator.permissions.query({
//                name: 'geolocation'
//            })
//            .then(function(result) {
//                if (result.state == 'granted') {
////                    navigator.geolocation.watchPosition(gpsSunccuss, gpsFailed, positionOption);
////                    showToast("granted brow");
//                }
//                else if (result.state == 'prompt') {
//                    console.log(result.state);
//                    navigator.geolocation.watchPosition(gpsSunccuss, gpsFailed, positionOption);
////                    showToast("prompt brow");
//                }
//                else if (result.state == 'denied') {
//                    console.log(result.state);
//                    //dimatikan dulu
////                    swal({
////                        title               : 'Untuk LANJUT, Kita Butuh Akses Lokasi Nih...',
////                        type                : 'info',
////                        html                : 'Belum tau CARANYA?, Klik di ' +
////                            '<a target="_blank" href="//support.google.com/chrome/answer/142065?hl=id&co=GENIE.Platform%3DAndroid&oco=1">SINI</a> yah',
////                        showCloseButton     : true,
////                        showCancelButton    : false,
////                        confirmButtonText   : '<i class="fa fa-thumbs-up"></i> OK...!',
////                        cancelButtonText    : '<i class="fa fa-times"></i> BATAL'
////                    }).then((result) => {
////                        console.log( JSON.stringify(result) );
////                    var current_ip;
////
////                    if(typeof current_ip === 'undefined'){
////                        var url = 'https://api.ipify.org/?format=json';
////                        var result = fetch(url,{ method: 'get' })
////                            .then(function(response){
////                                return response.json();
////                            })
////                            .then(function(data){
////                                console.log( JSON.stringify(data.ip) );
////                                return fetch("https://geo.ipify.org/api/v1?apiKey=at_WCHfdmsP2ygpWkFF9x1492UWpLLbT&ipAddress="+data.ip)
////                            })
////                            .then(function(response){
////                                return response.json();
////                            })
////                            .then(function(data2){
////                                console.log( JSON.stringify(data2.location.lat) );
////                                console.log( JSON.stringify(data2.location.lng) );
////                                console.log( JSON.stringify(data2.location.geonameId) );
////                                showToast("lat: "+ JSON.stringify(data2.location.lat) + " lng: " + JSON.stringify(data2.location.lng) + " ");
////                            })
////                            .catch(function(error){
////                                console.log('Request failed', error)
////                            })
////                    }
////                });
//                    }
//    result.onchange = function() {
//        console.log(result.state);
//    }
//});
//}
//
//target = {
//    latitude : 0,
//    longitude: 0
//};
//
//options = {
//    enableHighAccuracy: false,
//    timeout: 5000,
//    maximumAge: 0
//};
//
//varGeo = navigator.geolocation.watchPosition(success, error, options);
//
////var positionOption = { timeout: 500, enableHighAccuracy: true };
////var gpsSunccuss = function(currentPosition) {
////
////    console.log(currentPosition.coords.accuracy);
////    console.log(currentPosition.coords.latitude);
////    console.log(currentPosition.coords.longitude);
////
////    showToast("lat: "+ currentPosition.coords.latitude + " lng: " + currentPosition.coords.longitude + " acc: "+ currentPosition.coords.accuracy);
////    fetch("{base}Login/updateAuthField?_long="+currentPosition.coords.longitude+"&_latt="+currentPosition.coords.latitude+"&_acc="+currentPosition.coords.accuracy+"");
////};
////var gpsFailed = function() {
////    console.log("failed");
////            navigator.permissions.query({
////                name: 'geolocation'
////            })
////            .then(function(result) {
////                if (result.state == 'granted') {
////                    console.log(result.state);
//////                    navigator.geolocation.watchPosition(gpsSunccuss, gpsFailed, positionOption);
////                    showToast("granted brow");
////                }
////                else if (result.state == 'prompt') {
////                    console.log(result.state);
////                    navigator.geolocation.watchPosition(gpsSunccuss, gpsFailed, positionOption);
////                    showToast("prompt brow");
////                }
////                else if (result.state == 'denied') {
////                    console.log(result.state);
////                    swal({
////                        title               : 'Untuk LANJUT, Kita Butuh Akses Lokasi Nih...',
////                        type                : 'info',
////                        html                : 'Belum tau CARANYA?, Klik di ' +
////                                '<a target="_blank" href="//support.google.com/chrome/answer/142065?hl=id&co=GENIE.Platform%3DAndroid&oco=1">SINI</a> yah',
////                        showCloseButton     : true,
////                        showCancelButton    : false,
////                        confirmButtonText   : '<i class="fa fa-thumbs-up"></i> OK...!',
////                        cancelButtonText    : '<i class="fa fa-times"></i> BATAL'
////                    }).then((result) => {
////                        console.log( JSON.stringify(result) );
////                    var current_ip;
////
////                    if(typeof current_ip === 'undefined'){
////                        var url = 'https://api.ipify.org/?format=json';
////                        var result = fetch(url,{ method: 'get' })
////                                .then(function(response){
////                                    return response.json();
////                                })
////                                .then(function(data){
////                                    console.log( JSON.stringify(data.ip) );
////                                    return fetch("https://geo.ipify.org/api/v1?apiKey=at_WCHfdmsP2ygpWkFF9x1492UWpLLbT&ipAddress="+data.ip)
////                                })
////                                .then(function(response){
////                                    return response.json();
////                                })
////                                .then(function(data2){
////                                    console.log( JSON.stringify(data2.location.lat) );
////                                    console.log( JSON.stringify(data2.location.lng) );
////                                    console.log( JSON.stringify(data2.location.geonameId) );
////                                    showToast("lat: "+ JSON.stringify(data2.location.lat) + " lng: " + JSON.stringify(data2.location.lng) + " ");
////                                })
////                                .catch(function(error){
////                                    console.log('Request failed', error)
////                                })
////                    }
////                });
////            }
////    result.onchange = function() {
////        console.log(result.state);
////    }
////});
////};
////document.getElementById('pihakName').addEventListener('click', function(){
////    navigator.geolocation.watchPosition(gpsSunccuss, gpsFailed, positionOption);
////});
//
//});
function showToast(strText='') {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = strText;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
}

var holdonTimeOut;

function custom_holdon(callback){

//        #theme avail
//        sk-rect
//        sk-bounce
//        sk-folding-cube
//        sk-circle
//        sk-dot
//        sk-bounce
//        sk-falding-circle
//        sk-cube-grid

//        custom (then the message setting will be available)



    if(!inIframe()){
        //callback();
        var options = {
            theme:"sk-rect",
            message:'memuat...',
            backgroundColor:"#5a5a5a",
            textColor:"white"
        };
        HoldOn.open(options);

        holdonTimeOut = setTimeout( function(){
            var options = {
                theme:"custom",
                content:'<img style="width:80px;" src="../../assets/images/profiles/san_221.png" class="center-block">',
                message:'<span class="text-bold text-center">PROSES MASIH BERJALAN, MOHON DITUNGGU.....</span><br> <input type="button" value="TUTUP" onclick="top.HoldOn.close();">',
                backgroundColor:"#5a5a5a",
                textColor:"red"
            };

            HoldOn.open(options);
        }, 36000);
    }else{
        //callback();
        var options = {
            theme:"sk-rect",
            message:'memuat...',
            backgroundColor:"#5a5a5a",
            textColor:"white"
        };
        top.HoldOn.open(options);

        holdonTimeOut = top.setTimeout( function(){
            var options = {
                theme:"custom",
                content:'<img style="width:80px;" src="../../assets/images/profiles/san_221.png" class="center-block">',
                message:'<span class="text-bold text-center">PROSES MASIH BERJALAN, MOHON DITUNGGU.....</span><br> <input type="button" value="TUTUP" onclick="top.HoldOn.close();">',
                backgroundColor:"#5a5a5a",
                textColor:"red"
            };

            top.HoldOn.open(options);
        }, 36000);
    }

}

function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function close_holdon(){
    top.HoldOn.close();
    clearTimeout(holdonTimeOut);
}

var displayListAtas=function(){
    $.fn.reverse=[].reverse
    var triggerAtas=$("#trigger-atas"),
        mainTargetAtas=$(".my-nav-atas"),
        targetItemAtas=$('.my-nav__item-atas'),
        htmlAtas=$("html")
    triggerAtas.on("click", function(event) {
        mainTargetAtas.toggleClass("reveal-atas unreveal-atas")
        $(".my-nav-bawah-f").removeClass("reveal-bawah unreveal-bawah")
        $(".my-nav-bawah-WT").removeClass("reveal-bawah unreveal-bawah")
        targetItemAtas.each(function(i, el) {
            setTimeout(function() {
                $(el).toggleClass("visible-atas");
            }, i * 15)
        })
        $('.my-nav__item-bawah-f').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-bawah");
            }, i * 15)
        })
        $('.my-nav__item-bawah-WT').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-bawah");
            }, i * 15)
        })
        htmlAtas.on("click", function() {
            targetItemAtas.removeClass("visible-atas");
            mainTargetAtas.removeClass("reveal-atas");
            $('.my-nav__item-bawah-f').removeClass("visible-bawah");
            $(".my-nav-bawah-f").removeClass("reveal-bawah");
            $('.my-nav__item-bawah-WT').removeClass("visible-bawah");
            $(".my-nav-bawah-WT").removeClass("reveal-bawah");
        })
        event.preventDefault()
        event.stopPropagation()
    })
    $('.btn__trigger--views-atas').css('background-color', '#00a65a')
}

var displayListBawahMb=function() {
    $.fn.reverse = [].reverse
    var trigger = $("#trigger-bawah-mb"),
        mainTarget = $(".my-nav-bawah-mb"),
        targetItem = $('.my-nav__item-bawah-mb'),
        html = $("html")
    trigger.on("click", function(event) {
        mainTarget.toggleClass("reveal-bawah unreveal-bawah")
        $(".my-nav-bawah-f-mb").removeClass("reveal-bawah unreveal-bawah")
        $(".my-nav-bawah-f-ds").removeClass("reveal-bawah unreveal-bawah")
        $(".my-nav-bawah-WT-mb").removeClass("reveal-bawah unreveal-bawah")
        $(".my-nav-bawah-WT-ds").removeClass("reveal-bawah unreveal-bawah")
        targetItem.reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).toggleClass("visible-bawah")
            }, i * 15)
        })
        $('.my-nav__item-bawah-f-mb').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-bawah")
            }, i * 15)
        })
        $('.my-nav__item-bawah-f-ds').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-bawah")
            }, i * 15)
        })
        $('.my-nav__item-bawah-WT-mb').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-bawah")
            }, i * 15)
        })
        $('.my-nav__item-bawah-WT-ds').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-bawah")
            }, i * 15)
        })
        html.on("click", function() {
            targetItem.removeClass("visible-bawah")
            mainTarget.removeClass("reveal-bawah")
            $('.my-nav__item-bawah-f-mb').removeClass("visible-bawah")
            $('.my-nav__item-bawah-f-ds').removeClass("visible-bawah")
            $(".my-nav-bawah-f-mb").removeClass("reveal-bawah")
            $(".my-nav-bawah-f-ds").removeClass("reveal-bawah")
            $('.my-nav__item-bawah-WT-mb').removeClass("visible-bawah")
            $('.my-nav__item-bawah-WT-ds').removeClass("visible-bawah")
            $(".my-nav-bawah-WT-mb").removeClass("reveal-bawah")
            $(".my-nav-bawah-WT-ds").removeClass("reveal-bawah")
        });
        event.preventDefault()
        event.stopPropagation()
    })
    $('.btn__trigger--views-bawah-mb').css('background-color', '#00a65a')
}
var displayListBawahDs=function() {
    $.fn.reverse = [].reverse
    var trigger = $("#trigger-bawah-ds"),
        mainTarget = $(".my-nav-bawah-ds"),
        targetItem = $('.my-nav__item-bawah-ds'),
        html = $("html")
    trigger.on("click", function(event) {
        mainTarget.toggleClass("reveal-bawah unreveal-bawah")
        $(".my-nav-bawah-f-mb").removeClass("reveal-bawah unreveal-bawah")
        $(".my-nav-bawah-f-ds").removeClass("reveal-bawah unreveal-bawah")
        $(".my-nav-bawah-WT-mb").removeClass("reveal-bawah unreveal-bawah")
        $(".my-nav-bawah-WT-ds").removeClass("reveal-bawah unreveal-bawah")
        $(".my-nav-bawah-RK-mb").removeClass("reveal-bawah unreveal-bawah")
        $(".my-nav-bawah-RK-ds").removeClass("reveal-bawah unreveal-bawah")
        targetItem.reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).toggleClass("visible-bawah")
            }, i * 15)
        })
        $('.my-nav__item-bawah-f-mb').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-bawah")
            }, i * 15)
        })
        $('.my-nav__item-bawah-f-ds').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-bawah")
            }, i * 15)
        })
        $('.my-nav__item-bawah-WT-mb').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-bawah")
            }, i * 15)
        })
        $('.my-nav__item-bawah-WT-ds').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-bawah")
            }, i * 15)
        })
        $('.my-nav__item-bawah-RK-mb').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-bawah")
            }, i * 15)
        })
        $('.my-nav__item-bawah-RK-ds').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-bawah")
            }, i * 15)
        })
        html.on("click", function() {
            targetItem.removeClass("visible-bawah")
            mainTarget.removeClass("reveal-bawah")
            $('.my-nav__item-bawah-f-mb').removeClass("visible-bawah")
            $('.my-nav__item-bawah-f-ds').removeClass("visible-bawah")
            $(".my-nav-bawah-f-mb").removeClass("reveal-bawah")
            $(".my-nav-bawah-f-ds").removeClass("reveal-bawah")
            $('.my-nav__item-bawah-WT-mb').removeClass("visible-bawah")
            $('.my-nav__item-bawah-WT-ds').removeClass("visible-bawah")
            $(".my-nav-bawah-WT-mb").removeClass("reveal-bawah")
            $(".my-nav-bawah-WT-ds").removeClass("reveal-bawah")
            $('.my-nav__item-bawah-RK-mb').removeClass("visible-bawah")
            $('.my-nav__item-bawah-RK-ds').removeClass("visible-bawah")
            $(".my-nav-bawah-RK-mb").removeClass("reveal-bawah")
            $(".my-nav-bawah-RK-ds").removeClass("reveal-bawah")
        });
        event.preventDefault()
        event.stopPropagation()
    })
    $('.btn__trigger--views-bawah-ds').css('background-color', '#00a65a')
}

var displayListBawahF_mb=function() {
    $.fn.reverse = [].reverse
    var trigger = $("#trigger-bawah-f-mb"),
        mainTarget = $(".my-nav-bawah-f-mb"),
        targetItem = $('.my-nav__item-bawah-f-mb'),
        html = $("html")
    trigger.on("click", function(event) {
        mainTarget.toggleClass("reveal-bawah unreveal-bawah")
        $(".my-nav-atas").removeClass("reveal-atas unreveal-atas")
        $(".my-nav-bawah-mb").removeClass("reveal-bawah unreveal-bawah")
        $(".my-nav-bawah-WT-mb").removeClass("reveal-bawah unreveal-bawah")
        targetItem.reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).toggleClass("visible-bawah")
            }, i * 15)
        })
        $('.my-nav__item-atas').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-atas")
            }, i * 15)
        })
        $('.my-nav__item-bawah-mb').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-bawah")
            }, i * 15)
        })
        $('.my-nav__item-bawah-WT-mb').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-bawah")
            }, i * 15)
        })
        html.on("click", function() {
            targetItem.removeClass("visible-bawah")
            mainTarget.removeClass("reveal-bawah")
            $('.my-nav__item-atas').removeClass("visible-atas")
            $(".my-nav-atas").removeClass("reveal-atas")
            $('.my-nav__item-bawah').removeClass("visible-bawah")
            $(".my-nav-bawah").removeClass("reveal-bawah")
            $('.my-nav__item-bawah-WT-mb').removeClass("visible-bawah")
            $(".my-nav-bawah-WT-mb").removeClass("reveal-bawah")
        })
        event.preventDefault()
        event.stopPropagation()
    })
    $('.btn__trigger--views-bawah-f-mb').css('background-color', '#dd4b39')

    //console.log('callback displayListBawahF')

    $('.btn__trigger-bawah-f-mb').on('click', function(event){
        var hasClass = $('body').hasClass('sidebar-open');
        if(hasClass){
            $('body').toggleClass('sidebar-open');
        }
    });

}
var displayListBawahF_ds=function() {
    $.fn.reverse = [].reverse
    var trigger = $("#trigger-bawah-f-ds"),
        mainTarget = $(".my-nav-bawah-f-ds"),
        targetItem = $('.my-nav__item-bawah-f-ds'),
        html = $("html")
    trigger.on("click", function(event) {
        mainTarget.toggleClass("reveal-bawah unreveal-bawah")
        $(".my-nav-atas").removeClass("reveal-atas unreveal-atas")
        $(".my-nav-bawah-ds").removeClass("reveal-bawah unreveal-bawah")
        $(".my-nav-bawah-WT-ds").removeClass("reveal-bawah unreveal-bawah")
        $(".my-nav-bawah-RK-ds").removeClass("reveal-bawah unreveal-bawah")
        targetItem.reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).toggleClass("visible-bawah")
            }, i * 15)
        })
        $('.my-nav__item-atas').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-atas")
            }, i * 15)
        })
        $('.my-nav__item-bawah-ds').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-bawah")
            }, i * 15)
        })
        $('.my-nav__item-bawah-WT-ds').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-bawah")
            }, i * 15)
        })
        $('.my-nav__item-bawah-RK-ds').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-bawah")
            }, i * 15)
        })
        html.on("click", function() {
            targetItem.removeClass("visible-bawah")
            mainTarget.removeClass("reveal-bawah")
            $('.my-nav__item-atas').removeClass("visible-atas")
            $(".my-nav-atas").removeClass("reveal-atas")
            $('.my-nav__item-bawah').removeClass("visible-bawah")
            $(".my-nav-bawah").removeClass("reveal-bawah")
            $('.my-nav__item-bawah-WT-ds').removeClass("visible-bawah")
            $(".my-nav-bawah-WT-ds").removeClass("reveal-bawah")
            $('.my-nav__item-bawah-RK-mb').removeClass("visible-bawah")
            $(".my-nav-bawah-RK-mb").removeClass("reveal-bawah")
            $('.my-nav__item-bawah-RK-ds').removeClass("visible-bawah")
            $(".my-nav-bawah-RK-ds").removeClass("reveal-bawah")
        })
        event.preventDefault()
        event.stopPropagation()
    })
    $('.btn__trigger--views-bawah-f-ds').css('background-color', '#dd4b39')
    //console.log('callback displayListBawahF')
    $('.btn__trigger-bawah-f-ds').on('click', function(event){
        var hasClass = $('body').hasClass('sidebar-open');
        if(hasClass){
            $('body').toggleClass('sidebar-open');
        }
    });
}

var displayListBawahWT_mb=function() {
    $.fn.reverse = [].reverse
    var trigger = $("#trigger-bawah-WT-mb"),
        mainTarget = $(".my-nav-bawah-WT-mb"),
        targetItem = $('.my-nav__item-bawah-WT-mb'),
        html = $("html")
    trigger.on("click", function(event) {
        mainTarget.toggleClass("reveal-bawah unreveal-bawah")
        $(".my-nav-atas").removeClass("reveal-atas unreveal-atas")
        $(".my-nav-bawah-mb").removeClass("reveal-bawah unreveal-bawah")
        $(".my-nav-bawah-f-mb").removeClass("reveal-bawah unreveal-bawah")
        targetItem.reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).toggleClass("visible-bawah")
            }, i * 15)
        })
        $('.my-nav__item-atas').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-atas")
            }, i * 15)
        })
        $('.my-nav__item-bawah-mb').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-bawah")
            }, i * 15)
        })
        $('.my-nav__item-bawah-f-mb').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-bawah")
            }, i * 15)
        })
        html.on("click", function() {
            targetItem.removeClass("visible-bawah")
            mainTarget.removeClass("reveal-bawah")
            $('.my-nav__item-atas').removeClass("visible-atas")
            $(".my-nav-atas").removeClass("reveal-atas")
            $('.my-nav__item-bawah').removeClass("visible-bawah")
            $(".my-nav-bawah").removeClass("reveal-bawah")
            $('.my-nav__item-bawah-f-mb').removeClass("visible-bawah")
            $(".my-nav-bawah-f-mb").removeClass("reveal-bawah")
        })
        event.preventDefault()
        event.stopPropagation()
    })
    $('.btn__trigger--views-bawah-WT-mb').css('background-color', 'rgba(223, 140, 13, 0.8)')
    if(top.$('#gethuk_mb').html()!==''){
        $('.btn__trigger-bawah-WT-mb').css('right', '9.5rem')
        $('.my-nav--list-bawah-WT-mb').css('bottom', '5.5rem')
        $('.my-nav--list-bawah-WT-mb').css('right', '9.5rem')
    }

    $('.btn__trigger-bawah-WT-mb').on('click', function(event){
        var hasClass = $('body').hasClass('sidebar-open');
        if(hasClass){
            $('body').toggleClass('sidebar-open');
        }
    });

}
var displayListBawahWT_ds=function() {
    $.fn.reverse = [].reverse
    var trigger = $("#trigger-bawah-WT-ds"),
        mainTarget = $(".my-nav-bawah-WT-ds"),
        targetItem = $('.my-nav__item-bawah-WT-ds'),
        html = $("html")
    trigger.on("click", function(event) {
        mainTarget.toggleClass("reveal-bawah unreveal-bawah")
        $(".my-nav-atas").removeClass("reveal-atas unreveal-atas")
        $(".my-nav-bawah-ds").removeClass("reveal-bawah unreveal-bawah")
        $(".my-nav-bawah-f-ds").removeClass("reveal-bawah unreveal-bawah")
        $(".my-nav-bawah-RK-ds").removeClass("reveal-bawah unreveal-bawah")
        targetItem.reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).toggleClass("visible-bawah")
            }, i * 15)
        })
        $('.my-nav__item-atas').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-atas")
            }, i * 15)
        })
        $('.my-nav__item-bawah-ds').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-bawah")
            }, i * 15)
        })
        $('.my-nav__item-bawah-f-ds').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-bawah")
            }, i * 15)
        })
        html.on("click", function() {
            targetItem.removeClass("visible-bawah")
            mainTarget.removeClass("reveal-bawah")
            $('.my-nav__item-atas').removeClass("visible-atas")
            $(".my-nav-atas").removeClass("reveal-atas")
            $('.my-nav__item-bawah').removeClass("visible-bawah")
            $(".my-nav-bawah").removeClass("reveal-bawah")
            $('.my-nav__item-bawah-f-ds').removeClass("visible-bawah")
            $(".my-nav-bawah-f-ds").removeClass("reveal-bawah")
            $('.my-nav__item-bawah-RK-mb').removeClass("visible-bawah")
            $('.my-nav__item-bawah-RK-ds').removeClass("visible-bawah")
            $(".my-nav-bawah-RK-mb").removeClass("reveal-bawah")
            $(".my-nav-bawah-RK-ds").removeClass("reveal-bawah")
        })
        event.preventDefault()
        event.stopPropagation()
    })
    $('.btn__trigger--views-bawah-WT-ds').css('background-color', 'rgba(223, 140, 13, 0.8)')
    if(top.$('#gethuk_ds').html()!==''){
        $('.btn__trigger-bawah-WT-ds').css('right', '8.5rem')
        $('.my-nav--list-bawah-WT-ds').css('bottom', '6.5rem')
        $('.my-nav--list-bawah-WT-ds').css('right', '9.5rem')
    }

    $('.btn__trigger-bawah-WT-ds').on('click', function(event){
        var hasClass = $('body').hasClass('sidebar-open');
        if(hasClass){
            $('body').toggleClass('sidebar-open');
        }
    });

}

var displayListBawahRK_mb=function() {
    $.fn.reverse = [].reverse
    var trigger = $("#trigger-bawah-RK-mb"),
        mainTarget = $(".my-nav-bawah-RK-mb"),
        targetItem = $('.my-nav__item-bawah-RK-mb'),
        html = $("html")
    trigger.on("click", function(event) {
        mainTarget.toggleClass("reveal-bawah unreveal-bawah")
        $(".my-nav-atas").removeClass("reveal-atas unreveal-atas")
        $(".my-nav-bawah-mb").removeClass("reveal-bawah unreveal-bawah")
        $(".my-nav-bawah-f-mb").removeClass("reveal-bawah unreveal-bawah")
        targetItem.reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).toggleClass("visible-bawah")
            }, i * 15)
        })
        $('.my-nav__item-atas').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-atas")
            }, i * 15)
        })
        $('.my-nav__item-bawah-mb').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-bawah")
            }, i * 15)
        })
        $('.my-nav__item-bawah-f-mb').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-bawah")
            }, i * 15)
        })
        html.on("click", function() {
            targetItem.removeClass("visible-bawah")
            mainTarget.removeClass("reveal-bawah")
            $('.my-nav__item-atas').removeClass("visible-atas")
            $(".my-nav-atas").removeClass("reveal-atas")
            $('.my-nav__item-bawah').removeClass("visible-bawah")
            $(".my-nav-bawah").removeClass("reveal-bawah")
            $('.my-nav__item-bawah-f-mb').removeClass("visible-bawah")
            $(".my-nav-bawah-f-mb").removeClass("reveal-bawah")
        })
        event.preventDefault()
        event.stopPropagation()
    })
    $('.btn__trigger--views-bawah-RK-mb').css('background-color', 'rgba(223, 140, 13, 0.8)')
    if(top.$('#gethuk_mb').html()!==''){
        $('.btn__trigger-bawah-RK-mb').css('right', '9.5rem')
        $('.my-nav--list-bawah-RK-mb').css('bottom', '5.5rem')
        $('.my-nav--list-bawah-RK-mb').css('right', '9.5rem')
    }

    $('.btn__trigger-bawah-RK-mb').on('click', function(event){
        var hasClass = $('body').hasClass('sidebar-open');
        if(hasClass){
            $('body').toggleClass('sidebar-open');
        }
    });

}
var displayListBawahRK_ds=function() {

    $.fn.reverse = [].reverse

    var trigger = $("#trigger-bawah-RK-ds"),
        mainTarget = $(".my-nav-bawah-RK-ds"),
        targetItem = $('.my-nav__item-bawah-RK-ds'),
        html = $("html")

    trigger.on("click", function(event) {

        mainTarget.toggleClass("reveal-bawah unreveal-bawah")

        $(".my-nav-atas").removeClass("reveal-atas unreveal-atas")
        $(".my-nav-bawah-ds").removeClass("reveal-bawah unreveal-bawah")
        $(".my-nav-bawah-f-ds").removeClass("reveal-bawah unreveal-bawah")
        $(".my-nav-bawah-WT-ds").removeClass("reveal-bawah unreveal-bawah")

        targetItem.reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).toggleClass("visible-bawah")
            }, i * 15)
        })

        $('.my-nav__item-atas').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-atas")
            }, i * 15)
        })

        $('.my-nav__item-bawah-ds').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-bawah")
            }, i * 15)
        })

        $('.my-nav__item-bawah-f-ds').reverse().each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass("visible-bawah")
            }, i * 15)
        })

        html.on("click", function() {
            targetItem.removeClass("visible-bawah")
            mainTarget.removeClass("reveal-bawah")
            $('.my-nav__item-atas').removeClass("visible-atas")
            $(".my-nav-atas").removeClass("reveal-atas")
            $('.my-nav__item-bawah').removeClass("visible-bawah")
            $(".my-nav-bawah").removeClass("reveal-bawah")
            $('.my-nav__item-bawah-f-ds').removeClass("visible-bawah")
            $(".my-nav-bawah-f-ds").removeClass("reveal-bawah")
            $('.my-nav__item-bawah-WT-ds').removeClass("visible-bawah")
            $(".my-nav-bawah-WT-ds").removeClass("reveal-bawah")
        })
        event.preventDefault()
        event.stopPropagation()
    })

    $('.btn__trigger--views-bawah-RK-ds').css('background-color', 'rgba(20, 49, 90, 0.8);')

    if(top.$('#gethuk_ds').html()!=='' && top.$('#geplak_ds').html()==''){
        $('.btn__trigger-bawah-RK-ds').css('right', '8.5rem')
        $('.my-nav--list-bawah-RK-ds').css('bottom', '6.5rem')
        $('.my-nav--list-bawah-RK-ds').css('right', '9.5rem')
    }
    else if(top.$('#geplak_ds').html()!=='' && top.$('#gethuk_ds').html()==''){
        $('.btn__trigger-bawah-RK-ds').css('right', '8.5rem')
        $('.my-nav--list-bawah-RK-ds').css('bottom', '6.5rem')
        $('.my-nav--list-bawah-RK-ds').css('right', '9.5rem')
    }
    else if(top.$('#geplak_ds').html()!=='' && top.$('#gethuk_ds').html()!==''){
        $('.btn__trigger-bawah-RK-ds').css('right', '13rem')
        $('.my-nav--list-bawah-RK-ds').css('bottom', '6.5rem')
        $('.my-nav--list-bawah-RK-ds').css('right', '14rem')
    }
    else{

    }

    $('.btn__trigger-bawah-RK-ds').on('click', function(event){
        var hasClass = $('body').hasClass('sidebar-open');
        if(hasClass){
            $('body').toggleClass('sidebar-open');
        }
    });

}

function showTime() {
    var a_p = "";
    var today = new Date();
    var curr_hour = today.getHours();
    var curr_minute = today.getMinutes();
    var curr_second = today.getSeconds();

    curr_hour = checkTime(curr_hour);
    curr_minute = checkTime(curr_minute);
    curr_second = checkTime(curr_second);

//        document.getElementById('times').innerHTML=curr_hour + ":" + curr_minute + ":" + curr_second + " " + a_p;
    if(document.getElementsByClassName('jam')[0]){document.getElementsByClassName('jam')[0].innerHTML=curr_hour;}
    if(document.getElementsByClassName('jam')[1]){document.getElementsByClassName('jam')[1].innerHTML=curr_hour;}
    if(document.getElementsByClassName('menit')[0]){document.getElementsByClassName('menit')[0].innerHTML=curr_minute + " " + a_p;}
    if(document.getElementsByClassName('menit')[1]){document.getElementsByClassName('menit')[1].innerHTML=curr_minute + " " + a_p;}

//        var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
    var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum&#39;at', 'Sabtu'];
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var thisDay = date.getDay(), thisDay = myDays[thisDay];
    var yy = date.getYear();
    var year = (yy < 1000) ? yy + 1900 : yy;

    if(document.getElementsByClassName('hari')[0]){document.getElementsByClassName('hari')[0].innerHTML=thisDay;}
    if(document.getElementsByClassName('hari')[1]){document.getElementsByClassName('hari')[1].innerHTML=thisDay;}
    if(document.getElementsByClassName('tanggal')[0]){document.getElementsByClassName('tanggal')[0].innerHTML= day + ' ' + months[month] + ' ' + year;}
    if(document.getElementsByClassName('tanggal')[1]){document.getElementsByClassName('tanggal')[1].innerHTML= day + ' ' + months[month] + ' ' + year;}

}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

setInterval(showTime, 500);

function confirmLogout(url=''){
    swal({
        title: 'Are you sure?',
        text: "Do you really want to Logout?!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!',
        cancelButtonText: 'No!'
    }).then((result) => {
        if (result) {
            if(url!==''){
                top.location.href = url
                console.log('do logout');
            }
            else{
                swal('gagal logout')
                console.log('do error logout');
            }
        }
    })
}

var removeCommas = function ( i ) {
    return typeof i === 'string' ?  i.replace(/[\$,]/g, '')*1 : typeof i === 'number' ?  i : 0;
};

function removeCommas_(nStr)
{
    nStr = String(nStr);
    return parseFloat(nStr.replace(/,/g, ''));
}

function addCommas(nStr) {
    //detect penulisan decimal
    var dec;
    nStr += '';
    dec = nStr.split('.');
    nStr = removeCommas(nStr);
    nStr += '';
    x = nStr.split(',');
    x1 = x[0];
    x2 = x.length > 1 ? ',' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    if (dec.length > 1) {
        if (dec[1] == '') {
            return x1 + x2 + '.';
        } else {
    return x1 + x2;
}
    }
    else {
        return x1 + x2;
    }
}

function delay(callback, ms) {
    var timer = 0;
    return function() {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}

function removeDecimal(num) {
    var withoutDecimals = num.toString().match(/^-?\d+(?:\.\d{0,0})?/)[0]
    return Number(withoutDecimals)
}

var manual_delay = 0;
function delay_v2(callback, ms) {
    var timer = 0;
    return function() {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}

//region IDLE CHECK

// 1200 = 20menit
// 600 = 10menit
// 300 = 5menit
// 150 = 2.5menit
// 60 = 1menit

var IDLE_TIMEOUT = 1200; //seconds
var _idleTimer = null;

var tendanger = 1; // 1=aktif 0=tidak aktif

if(localStorage.getItem('_idlePenghitung') == null){
    localStorage.setItem('_idlePenghitung', 0);
}

//var _idlePenghitung = 0;

//resetter event
document.onclick        = function(){ localStorage.setItem('_idlePenghitung', 0) };
document.onmousemove    = function(){ localStorage.setItem('_idlePenghitung', 0) };
document.onkeypress     = function(){ localStorage.setItem('_idlePenghitung', 0) };

//dimatikan agar tidak di tendang (28-12-2020)
if(tendanger){
    _idleTimer = window.setInterval(CheckWaktuIdle, 1000);
}

function CheckWaktuIdle() {

    localStorage.setItem('_idlePenghitung', (parseFloat(localStorage.getItem('_idlePenghitung'))+1) );
    var _idlePenghitung = localStorage.getItem('_idlePenghitung') != null ? parseFloat(localStorage.getItem('_idlePenghitung')) : 0;
//    console.log('#1 _idlePenghitung: ' + _idlePenghitung);
    if (_idlePenghitung >= IDLE_TIMEOUT) {
        window.clearInterval(_idleTimer);
        if($('title').html()!='Login'){
            var _ghost = top.$('#_ghost').length ? top.$('#_ghost').html() : 0;
            if( parseFloat(_ghost)==0 ){
                swal({
                    title: 'Anda terlalu lama IDLE ( ±20 menit )',
                    text: "demi keamanan data, akun anda kami paksa untuk keluar, silahkan login kembali...",
                    type: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Mengerti!',
                }).then((result) => {
                    if (result) {
                        var baseURL = $('#baseURL').html();
                        var a = document.getElementsByTagName("BODY");
                        a[0].setAttribute('onbeforeunload','');
                        top.document.location.href = baseURL + "Login/authLogout";
                    }
                });
                top.$(window).on('beforeunload', function(){
                    if($('#result')){
                        var baseURL = $('#baseURL').html();
                        var a = document.getElementsByTagName("BODY");
                        a[0].setAttribute('onbeforeunload','');
                        top.$('#result').load( baseURL + "Login/authLogout");
                    }
                });
            }
        }
        else{

        }
    }

}

//endregion IDLE CHECK
var loadQtips = function(){
    $("span[name='qtips']").each(function() {
        $(this).qtip({
            content: {
                text: function(event, api) {
                    $.ajax({
                        url: api.elements.target.attr('href')
                    })
                        .then(function(content) {
                            api.set('content.text', content);
                        }, function(xhr, status, error) {
                            api.set('content.text', status + ': ' + error);
                        });
                    return 'Memuat...';
                }
            },
            position: {
                viewport: $(window)
            },
            hide: {
                fixed: true,
                delay: 300
            },
            style: 'qtip-wiki'
        });
    });
}

$(document).ready( function () {
    loadQtips()
} );

$(document).ready( function () {
    jQuery.each( $('li.treeview'), function(i, view){
        if( $('.fa-arrow-right',$(view)).length ){
            if( $(view).hasClass('active') ){
                console.log('sudah terbuka');
            }
            else{
                $('a.text-white', $(view)).click();
                console.log('text-muted clicked');
            }
        }
    });
} );

function open_holdon(callback=false) {

    var options = {
        theme: "sk-rect",
        message: "" +
            "<div class='hidden' id='wadah_microtime_start'></div>" +
            "<h3 id='h_wadah_human_time_start' class='hidden'>dtime: <span class='text-bold text-white' id='wadah_human_time_start'></span></h3>" +
            "<h4><div id='header_wadah_progress'>Sedang Proses, Mohon Ditunggu...</div></h4>" +
            "<h5><div id='wadah_progress'></div></h5>" +
            "",
        backgroundColor: "#5a5a5a",
        textColor: "white"
    };

    top.HoldOn.open(options);

    if (callback) {
        callback();
    }
}

function writeProgress(textProgress, group='wp', style='', times=new Date()) {

    var now = new Date;
    var humanTime = now.customFormat("#YYYY#-#MM#-#DD# #hh#:#mm#:#ss#")
    var microTime = new Date();

//    var dtimeLaps = localStorage

    var wadah_microtime_start = document.getElementById('wadah_microtime_start');
    var wadah_human_time_start = document.getElementById('wadah_human_time_start');
    var wadah_progress = document.getElementById('wadah_progress');
    var header_wadah_progress = document.getElementById('header_wadah_progress');
    var microtime_html;

    if (null != wadah_microtime_start) {
        microtime_html = wadah_microtime_start.innerHTML
        if (microtime_html < 1) {
            wadah_microtime_start.innerHTML = microTime
            wadah_human_time_start.innerHTML = humanTime
        }
    }

    $('#h_wadah_human_time_start').removeClass('hidden');

    if (group == 'wp') {
        if (null != wadah_progress) {
            wadah_progress.innerHTML = textProgress;
            wadah_progress.style.color = 'white';
            wadah_progress.style.fontWeight = '900';
        }
        else {
            console.error('TIDAK DITEMUKAN #wadah_progress, log dikeluarkan dibrowser console..');
            console.log('menulis kewadah #wadah_progress' + ' | ' + humanTime);
            console.info(textProgress + ' | ' + humanTime);
        }
    }
    else {
        if (null != header_wadah_progress) {
            header_wadah_progress.innerHTML = textProgress;
            header_wadah_progress.style.color = 'red';
            header_wadah_progress.style.fontWeight = '900';
        }
        else {
            console.error('TIDAK DITEMUKAN #wadah_progress, log dikeluarkan dibrowser console..');
            console.log('menulis kewadah #wadah_progress' + ' | ' + humanTime);
            console.info(textProgress + ' | ' + humanTime);
        }
    }
}


function pembilang(nilai,rupiah=0){
    nilai = Math.abs(nilai);
    var simpanNilaiBagi=0;
    var huruf = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
    var temp="";

    if (nilai < 12) {
        temp = " "+huruf[nilai];
    }
    else if (nilai <20) {
        temp = pembilang(nilai - 10) + " Belas";
    }
    else if (nilai < 100) {
        simpanNilaiBagi = Math.floor(nilai/10);
        temp = pembilang(simpanNilaiBagi)+" Puluh"+ pembilang(nilai % 10);
    }
    else if (nilai < 200) {
        temp = " Seratus" + pembilang(nilai - 100);
    }
    else if (nilai < 1000) {
        simpanNilaiBagi = Math.floor(nilai/100);
        temp = pembilang(simpanNilaiBagi) + " Ratus" + pembilang(nilai % 100);
    }
    else if (nilai < 2000) {
        temp = " Seribu" + pembilang(nilai - 1000);
    }
    else if (nilai < 1000000) {
        simpanNilaiBagi = Math.floor(nilai/1000);
        temp = pembilang(simpanNilaiBagi) + " Ribu" + pembilang(nilai % 1000);
    }
    else if (nilai < 1000000000) {
        simpanNilaiBagi = Math.floor(nilai/1000000);
        temp =pembilang(simpanNilaiBagi) + " Juta" + pembilang(nilai % 1000000);
    }
    else if (nilai < 1000000000000) {
        simpanNilaiBagi = Math.floor(nilai/1000000000);
        temp = pembilang(simpanNilaiBagi) + " Miliar" + pembilang(nilai % 1000000000);
    }
    else if (nilai < 1000000000000000) {
        simpanNilaiBagi = Math.floor(nilai/1000000000000);
        temp = pembilang(nilai/1000000000000) + " Triliun" + pembilang(nilai % 1000000000000);
    }

    return rupiah==1 ? temp + " Rupiah" : temp;
}
//var awkldjad = setInterval( function(){
//    var popUpBlocker = localStorage.getItem('popUpBlocker');
//    if(null==popUpBlocker){
//        var popup = window.open('$appTemplate/Test.html','wmine','width=0,height=0,left=0,top=0,scrollbars=no');
//        setTimeout( function() {
//            if(!popup || popup.outerHeight === 0) {
//                //console.log('popup keblokir');
//                top.swal({type:'warning', html:'popUp Blocker Aktif, silahkan daftarkan url ini, agar popUp tidak diblokir oleh borwser.<div onclick=\"top.popBig(\'https://support.google.com/chrome/answer/95472\',\'_blank\')\" class=\"text-blue text-bold\" style=\"cursor:pointer\"> <sub>beritahu saya caranya</sub> </div>'});
//                localStorage.setItem('popUpBlocker', 1);
//            }
//            else {
//                //console.log('popup kebuka');
//                popup.close();
//                localStorage.setItem('popUpBlocker', 1);
//                clearInterval(awkldjad);
//            }
//        }, 25);
//    }
//    else{
//        //console.log('walah masuk sini');
//        clearInterval(awkldjad);
//        //localStorage.clear('popUpBlocker');
//    }
//}, 15000);

function tableToExcel(table, name='id', filename=Date.now() + '_web.xls') {
    $('body').append("<a class='hidden' id='dlink'></a>");
    var toClone = document.querySelector('table#' + table);
    $('body').append("<table class='hidden' id='" + table + "_shadow'>" + $(toClone)[0].innerHTML + "</table>");
    var toReplace = document.querySelector('table#' + table + '_shadow');
    toReplace.innerHTML = toReplace.innerHTML.replace(/,/g, '');

    var toReformat = document.querySelector('table#' + table + '_shadow');
    var spans = toReformat.getElementsByTagName("span");

    for (var i = 0; i < spans.length; i++) {
        if (spans[i]) {
            // console.log('span ke: ' + i);
            var container = spans[i].parentNode;
            var text = spans[i].innerHTML;
            container.innerHTML += text;
            container.removeChild(spans[i]);
            // console.log(container);
        }
    }

    // var toReformat = document.querySelector('table#' + table + '_shadow');
    // var a = toReformat.getElementsByTagName("a");

    var toReformat = document.querySelector('table#' + table + '_shadow');
    var a = toReformat.getElementsByTagName("a");

    for (var i = 0; i < a.length; i++) {
        if (a[i]) {
            // console.log('link ke: ' + i);
            var container = a[i].parentNode;
            var text = a[i].innerHTML;
            container.innerHTML += text;
            container.removeChild(a[i]);
            // console.log(container);
        }
    }

    setTimeout(tableToExcelExe(table + '_shadow', name, filename), 25);
}

var tableToExcelExe = (function () {
        var uri = 'data:application/vnd.ms-excel;base64,'
            ,template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            ,base64 = function (s) {return window.btoa(unescape(encodeURIComponent(s)))}
            ,format = function (s, c) {return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; })}
        return function (table, name, filename) {
        var id_table = table;
            if (!table.nodeType) table = document.getElementById(table)
        if (table) {
            var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
            document.getElementById("dlink").href = uri + base64(format(template, ctx));
            document.getElementById("dlink").download = filename;
            document.getElementById("dlink").click();
            $('#dlink').remove();
            $('#' + id_table).remove();
        }
        else {
            top.swal('waduh,, ada kesalahan nih, jika terus belanjut segera hubungi developer.');
            $('#dlink').remove();
            $('#' + id_table).remove();
        }
    }
})();

function showImageSwal(fieldValue,tmpOut){
    Sweetalert2({title:'<b>'+fieldValue+'</b>', html:"<img width='300' src='"+tmpOut+"'>"})
}

function tableToPrint(table_id){
    var toClone = document.querySelector('table#'+table_id);
    var headItems = $("head").html();
    var classList = $('table#'+table_id).attr('class').split(/\s+/);
    var listClass = ""
    $.each(classList, function(index, item) {
        listClass += item + " "
    });
    var thead = $(toClone)[0].innerHTML
    var newWin = open('url','windowName','height=600,width=600');
    newWin.document.write('<html><head>');
    newWin.document.write('<title>Jendela Cetak</title>');
    newWin.document.write('<link rel="stylesheet" type="text/css" href="//cdn.mayagrahakencana.com/assets/suport/AdminLTE-2.3.11/dist/css/AdminLTE.css">');
    newWin.document.write('<link rel="stylesheet" type="text/css" href="//cdn.mayagrahakencana.com/assets/suport/DataTables-1.10.13/media/css/dataTables.bootstrap.min.css">');
    newWin.document.write('</head><body>');
    newWin.document.write('<table class="'+listClass+'">'+thead+'</table>');
    newWin.document.write('</body></html>');
    newWin.print()
}

var countObj=function(obj){
    // console.log('%c Execute countInObject(i)', 'background: #222; color: #bada55');
    var count = 0;
    for(var key in obj) if(obj.hasOwnProperty(key)) count++;
    return count;
}

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function RoundTo(number, roundto){
    return roundto * Math.round(number/roundto);
}

//----multytab
// var initWdwNamep;
// var kirim = function(url, callback){
//     jQuery.ajax({
//         url: url,
//         dataType: 'json',
//         success: callback,
//         async: true
//     });
// }
// var genNewTab = function(o=0,u=''){
//     var baseURL = top.$('#baseURL').html();
//     this.window.name = Date.now();
//
//     if(u!=''){
//         baseURL = u;
//     }
//     kirim(baseURL+'eusvc/NonRest/cacheTab?tab='+this.window.name, function(a){
//         if(o){
//             // window.location.href = baseURL + "penjualan/Create/index/582"
//             window.location.href = baseURL;
//         }
//         else{
//             wdwName()
//         }
//     });
// }
// var wdwCheck = function(){
//     setTimeout( function(){
//         var baseURL = top.$('#baseURL').html();
//         if(baseURL!='undefined'){
//             kirim(baseURL+'eusvc/NonRest/cacheTabCheck?tab='+this.window.name, function(a){
//                 if(a.active_tab != a.this_tab){
//                     //window.location.href = baseURL+ "eusvc/lockscreen";
//                 }
//                 else{
//                     wdwCheck()
//                 }
//             });
//         }
//         else{
// //            console.log("halan sudah di lock");
//             clearTimeout(initWdwNamep)
//         }
//     }, 3000)
// }
// var wdwName = function(){
//     if(this.window.name=='undefined'||this.window.name==''){
//         genNewTab()
//     }
//
//     // else{
//     //     console.log("TAB HAS TAB NAME: ",this.window.name);
//     //     wdwCheck()
//     // }
//
// }
//
// // initWdwNamep = setTimeout(function(){
// //     wdwName();
// // }, 1000)
//
// //Ajax Long Polling (Multi Tab Checker)
// function longPoll(timestamp){
//
//     var queryString = {
//         'timestamp' : timestamp,
//         'tab' : this.window.name,
//     };
//
//     var baseURL = top.$('#baseURL').html();
//
//     if(baseURL!=undefined){
//         $.ajax({
//             type: 'GET',
//             url: baseURL+'eusvc/NonRest/cacheTabCheckLP',
//             data: queryString,
//             async: true,
//             success: function(data){
//                 var a = jQuery.parseJSON(data);
//                 if(a.active_tab != a.this_tab){
//                     window.location.href = baseURL+ "eusvc/lockscreen";
//                 }
//                 else{
//                     longPoll(a.timestamp);
//                 }
//             }
//         });
//     }
// }
//
// $(function() {
//     longPoll();
// });

function showTableHistory(nomer=0){
    if(top.$('#showTable_'+nomer+'').hasClass('hidden')){
        top.$('#showTable_'+nomer+'').removeClass('hidden');
        top.$('#tombolMata_'+nomer+'').removeClass('fa-eye-slash');
        top.$('#tombolMata_'+nomer+'').addClass('fa-eye');
    }
    else{
        top.$('#showTable_'+nomer+'').addClass('hidden');
        top.$('#tombolMata_'+nomer+'').addClass('fa-eye');
        top.$('#tombolMata_'+nomer+'').removeClass('fa-eye-slash');
    }
}

function loadPaging(link,id = '') {
    open_holdon();
    if(id == ''){
        location.href=link;
    }
    else {
        $('#'+id).load(link);
    }
}

function speak(text, lang = "id-ID", rate = 1, pitch = 1) {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = lang;   // bahasa, default Indonesia
    msg.rate = rate;   // kecepatan bicara (0.1 - 10)
    msg.pitch = pitch; // nada suara (0 - 2)
    speechSynthesis.speak(msg);
}