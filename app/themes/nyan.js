const NyanWrapper = document.getElementById("theme-wrapper")
const bodyNyan = document.getElementsByTagName("body")[0]

const Nyan = `  
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

function initNyan() {
  NyanWrapper.innerHTML = Nyan
  bodyNyan.classList.add("nyan")
}

nw.global.initNyan = initNyan

function endNyan() {
  NyanWrapper.innerHTML = ""
  bodyNyan.classList.remove("nyan")
}

nw.global.endNyan = endNyan
