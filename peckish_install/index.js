import * as core from "@actions/core"
import * as github from "@actions/github"
import * as tc from "@actions/tool-cache"
import * as exec from "@actions/exec"

(async () => {
  const octokit = github.getOctokit(opts.token)
  const release = await octokit.rest.repos.getLatestRelease({
    owner: "queer",
    repo: "peckish",
  })
  const binary = release.data.assets.find(asset => asset.name === "peckish")
  if(!binary) {
    throw new Error("could not find binary")
  }

  const path = await tc.downloadTool(binary.browser_download_url)
  await tc.cacheFile(path, "peckish", "peckish", release.data.tag_name)
  core.addPath(path)
  await exec.exec("peckish", ["-V"], {silent: false})
})()
