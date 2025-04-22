import yaml from "js-yaml";

interface FormValues {
  global?: Record<string, any>;
  alerting?: Record<string, any>;
  rule_files?: string[];
  remote_write?: Record<string, any>[];
  scrape_configs?: Record<string, any>[];
  target_groups?: { group: string; targets: { address: string }[] }[];
}

export const generatePrometheusYaml = (formValues: FormValues): string => {
  const yamlObj: any = {};

  if (formValues.global) {
    yamlObj.global = formValues.global;
  }

  if (formValues.alerting) {
    yamlObj.alerting = formValues.alerting;
  }

  if (formValues.rule_files) {
    yamlObj.rule_files = formValues.rule_files;
  }

  if (formValues.remote_write) {
    yamlObj.remote_write = formValues.remote_write;
  }

  yamlObj.scrape_configs = [];

  if (formValues.scrape_configs && formValues.scrape_configs.length > 0) {
    yamlObj.scrape_configs.push(...formValues.scrape_configs);
  }

  if (formValues.target_groups && formValues.target_groups.length > 0) {
    yamlObj.scrape_configs.push({
      job_name: "custom-target-groups",
      static_configs: formValues.target_groups.map((group) => ({
        labels: { group: group.group },
        targets: group.targets.map((t) => t.address),
      })),
    });
  }

  return yaml.dump(yamlObj, { noRefs: true });
};
