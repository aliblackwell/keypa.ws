const imagemin = require("imagemin");
const webp = require("imagemin-webp");

imagemin(["img/merlin-ali-jpg/*.jpg"], {
  destination: "img/merlin-ali",
  plugins: [
    webp({
      quality: 75
    })
  ]
}).then(function (result) {
  console.log("Images converted!");
});

imagemin(["img/*.jpg"], {
  destination: "img",
  plugins: [
    webp({
      quality: 75
    })
  ]
}).then(function (result) {
  console.log("Images converted!");
});
