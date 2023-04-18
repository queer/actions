import * as core from "@actions/core"
import * as github from "@actions/github"
import * as tc from "@actions/tool-cache"
import * as exec from "@actions/exec"

(async () => {
  console.log("installing peckish...")
  const octokit = github.getOctokit(process.env.GITHUB_TOKEN)
  const release = await octokit.rest.repos.getLatestRelease({
    owner: "queer",
    repo: "peckish",
  })
  console.log("fetched release:", release.data.tag_name)
  const binary = release.data.assets.find(asset => asset.name === "peckish")
  if(!binary) {
    throw new Error("could not find binary")
  }

  const path = await tc.downloadTool(binary.browser_download_url)
  await tc.cacheFile(path, "peckish", "peckish", release.data.tag_name)
  core.addPath(path)
  const exit = await exec.exec("peckish", ["-V"], {silent: false})
  if(exit !== 0) {
    throw new Error("peckish failed to install!?")
  }
  console.log("done!")
})()
