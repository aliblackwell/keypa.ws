function getOS() {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
    }

    return os;
}

var smartEls = document.querySelectorAll('.smart-el')
var windowsContents = document.querySelectorAll('.windows')
var macContents = document.querySelectorAll('.mac')
var linuxContents = document.querySelectorAll('.linux')
var mobContents = document.querySelectorAll('.mob')

smartEls.forEach(el => {
    hideEl(el)
})

let os = getOS()

switch (os) {
    case "Mac OS":
        macContents.forEach(el => showEl(el))
        break;
    case "Windows":
        windowsContents.forEach(el => showEl(el))
        break;
    case "Linux":
        linuxContents.forEach(el => showEl(el))
        break;
    default:
        mobContents.forEach(el => showEl(el))

}
