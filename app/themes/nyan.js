const NyanWrapper = document.getElementById("theme-wrapper")

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

		<audio autoplay="true" loop="true">
			<source src="audio/nyan-cat.ogg" type="audio/ogg" />
			<source src="audio/nyan-cat.mp3" type="audio/mpeg" />
		</audio>
  </div>
`

function initNyan() {
  const NyanWrapper = document.getElementById("theme-wrapper")
  NyanWrapper.innerHTML = Nyan
}

nw.global.initNyan = initNyan

function endNyan() {
  NyanWrapper.innerHTML = ""
}

nw.global.endNyan = endNyan
