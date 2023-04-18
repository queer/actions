import * as core from "@actions/core"
import * as github from "@actions/github"
import * as tc from "@actions/tool-cache"
import * as exec from "@actions/exec"
import * as path from "node:path"

(async () => {
  console.log("installing peckish...")
  const token = core.getInput("token")
  const octokit = github.getOctokit(token)
  const release = await octokit.rest.repos.getLatestRelease({
    owner: "queer",
    repo: "peckish",
  })
  console.log("fetched release:", release.data.tag_name)
  const binary = release.data.assets.find(asset => asset.name === "peckish")
  if(!binary) {
    throw new Error("could not find binary")
  }

  const tcPath = await tc.downloadTool(binary.browser_download_url)
  core.addPath(tcPath)
  const exit = await exec.exec("peckish", ["-V"], {silent: false})
  if(exit !== 0) {
    throw new Error("peckish failed to install!?")
  }
  console.log("done!")
})()
