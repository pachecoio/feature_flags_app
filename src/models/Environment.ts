import FeatureFlag from "./FeatureFlag";

export default class Environment {
  name: string
  flags: FeatureFlag[]

  constructor(name: string, flags: FeatureFlag[]) {
    this.name = name
    this.flags = flags
  }
}
