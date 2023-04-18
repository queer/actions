import * as exec from "@actions/exec"

export default async () => {
  await exec.exec("peckish")
}
