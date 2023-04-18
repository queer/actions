import * as exec from "@actions/exec"
import * as core from "@actions/core"

export default async () => {
  await exec.exec("peckish", ["-c", core.getInput("config")])
}
