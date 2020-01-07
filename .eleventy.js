module.exports = function(config) {
  // pass some assets right through
  config.addPassthroughCopy("./site/css")
  config.addPassthroughCopy("./site/img")
  config.addPassthroughCopy("./site/js")
  config.addPassthroughCopy("./site/_redirects")
  config.addPassthroughCopy("./site/humans.txt")
  config.addPassthroughCopy("./site/favicon.png")
  return {
    dir: {
      input: "site",
      output: "ship-site"
    }
  }
}
