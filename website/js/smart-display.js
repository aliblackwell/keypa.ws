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

    return 'd';
}

const smartEls = document.querySelectorAll('.smart-el')
const windowsContents = document.querySelectorAll('.windows')
const macContents = document.querySelectorAll('.mac')
const mobileMacContents = document.querySelectorAll('.mobile-mac')
const linuxContents = document.querySelectorAll('.linux')
const mobContents = document.querySelectorAll('.mob')
const winSignup = document.querySelector('#win-signup')
const linuxSignup = document.querySelector('#linux-signup')
const macMessage = document.querySelector('#mac-message')
const shareIt = document.querySelector('#share-it')

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

if (os === 'iOS' || os === 'Android') {


    const previousChoice = localStorage.getItem('desktop')
    let radios = document.querySelectorAll('input[type="radio"]')
    let radioWrappers = document.querySelectorAll(".wrapper")
    radios.forEach(function (elem) {
        elem.addEventListener("click", function (e) {
            let settingsValue = e.target.value
            hideEl(winSignup)
            hideEl(linuxSignup)
            hideEl(macMessage)
            showEl(shareIt)
            showMobileElements(settingsValue)
            storeDevice(settingsValue)
            if (settingsValue === 'windows') {
                showEl(winSignup)
            }
            if (settingsValue === 'mac') {
                showEl(macMessage)

            }
            if (settingsValue === 'linux') {
                showEl(linuxSignup)
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
    mobileMacContents.forEach(el => hideEl(el))
    if (desktop === 'mac') {
        mobileMacContents.forEach(el => showEl(el))
    }
}