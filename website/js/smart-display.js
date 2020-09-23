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

const smartEls = document.querySelectorAll('.smart-el')
const windowsContents = document.querySelectorAll('.windows')
const macContents = document.querySelectorAll('.mac')
const mobileMacContents = document.querySelectorAll('.mobile-mac')
const linuxContents = document.querySelectorAll('.linux')
const mobContents = document.querySelectorAll('.mob')
const winSignups = document.querySelectorAll('.win-signup')
const linuxSignups = document.querySelectorAll('linux-signup')
const macMessages = document.querySelectorAll('.mac-message')
const shareIts = document.querySelectorAll('.share-it')


hideEls(smartEls)


let os = getOS()

switch (os) {
    case "Mac OS":
        showEls(macContents)
        break;
    case "Windows":
        showEls(windowsContents)
        break;
    case "Linux":
        showEls(linuxContents)
        break;
    default:
        showEls(mobContents)

}

if (os === 'iOS' || os === 'Android') {


    const previousChoice = localStorage.getItem('desktop')
    let radios = document.querySelectorAll('input[type="radio"]')
    let radioWrappers = document.querySelectorAll(".wrapper")
    radios.forEach(function (elem) {
        elem.addEventListener("click", function (e) {
            let settingsValue = e.target.value
            hideEls(winSignups)
            hideEls(linuxSignups)
            hideEls(macMessages)
            showEls(shareIts)
            showMobileElements(settingsValue)
            storeDevice(settingsValue)
            if (settingsValue === 'windows') {
                showEls(winSignups)
            }
            if (settingsValue === 'mac') {
                showEls(macMessages)

            }
            if (settingsValue === 'linux') {
                showEls(linuxSignups)
            }


        })
    })
    if (previousChoice) {
        const radioToClick = document.querySelector('#' + previousChoice)
        radioToClick && radioToClick.click()
        showMobileElements(previousChoice)
    }

}
function storeDevice(desktop) {
    localStorage.setItem('desktop', desktop)
}

function showMobileElements(desktop) {

    hideEls(mobileMacContents)
    if (desktop === 'mac') {
        showEls(mobileMacContents)
    }
}