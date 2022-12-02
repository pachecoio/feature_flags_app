export default class FeatureFlag {
  id?: string;
  name!: string;
  label!: string;
  enabled: boolean = true;
  rules: Rule[];
  created_at!: Date
  updated_at!: Date

  constructor(
    id: string,
    name: string,
    label: string,
    enabled: boolean = false,
    rules: Rule[] = [],
    created_at: Date = new Date(),
    updated_at: Date = new Date
  ) {
    this.id = id;
    this.name = name;
    this.label = label;
    this.enabled = enabled;
    this.rules = rules;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

export class Rule {
  parameter: string;
  operator: object;
  constructor(parameter: string, operator: object) {
    this.parameter = parameter;
    this.operator = operator;
  }
}