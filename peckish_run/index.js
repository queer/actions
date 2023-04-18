import * as exec from "@actions/exec"
import * as core from "@actions/core"

(async () => {
  const exit = await exec.exec("peckish", ["-c", core.getInput("config")])
  if(exit !== 0) {
    throw new Error("peckish failed to run!?")
  }
})()
