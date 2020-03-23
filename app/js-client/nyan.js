/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[nN]yanInstance" }]*/

const { endWhichNyan } = require("./windows")

function NyanInstance(pageName) {
  const obj = {}

  obj.Nyan = `  
  <div class="nyan-wrapper">
		<div class="sparks-combo">
			<div class="spark"></div>
			<div class="spark"></div>
			<div class="spark"></div>
			<div class="spark"></div>
		</div>
		<div class="rainbow-wrapper">
			<div id="wave-a" class="hot rainbow"></div>
			<div id="wave-a" class="cold rainbow"></div>

			<div id="wave-b" class="hot rainbow"></div>
			<div id="wave-b" class="cold rainbow"></div>
		</div>
		<div id="nyan-cat" class="frame1">
			<div id="tail"></div>

			<div id="paws"></div>

			<div id="pop-tarts-body">
				<div id="pop-tarts-body-cream"></div>
			</div>

			<div id="head">
				<div id="face"></div>
			</div>
		</div>
  </div>
`

  obj.initNyan = () => {
    document.getElementById("theme-wrapper").innerHTML = obj.Nyan
    document.getElementsByTagName("body")[0].classList.add("nyan")
    obj.setCleanup()
  }

  obj.endNyan = () => {
    console.log(`ending ${pageName} Nyan`)
    document.getElementById("theme-wrapper").innerHTML = ""
    document.getElementsByTagName("body")[0].classList.remove("nyan")
  }

  obj.setCleanup = () => {
    endWhichNyan(pageName, obj.endNyan)
  }

  return obj
}
