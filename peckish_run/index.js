import * as exec from "@actions/exec"
import * as core from "@actions/core"

(async () => {
  await exec.exec("peckish", ["-c", core.getInput("config")])
})()
