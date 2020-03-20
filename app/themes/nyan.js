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
  document.getElementById("theme-wrapper").innerHTML = Nyan
  document.getElementsByTagName("body")[0].classList.add("nyan")
}

function endNyan() {
  document.getElementById("theme-wrapper").innerHTML = ""
  document.getElementsByTagName("body")[0].classList.remove("nyan")
}
!nw.global.initNyan && (nw.global.initNyan = initNyan)
!nw.global.endNyan && (nw.global.endNyan = endNyan)
