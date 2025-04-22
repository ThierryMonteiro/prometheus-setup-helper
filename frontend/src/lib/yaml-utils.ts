import { PrometheusConfig } from "./types";

// Convert the full configuration to YAML-compatible object
export function configToYaml(config: PrometheusConfig): Record<string, any> {
  const yamlObj: Record<string, any> = {};
  
  // Add global config if present
  if (config.global) {
    yamlObj.global = { ...config.global };
  }
  
  // Add alerting config if present
  if (config.alerting?.alertmanagers?.length) {
    yamlObj.alerting = {
      alertmanagers: config.alerting.alertmanagers.map(am => ({
        static_configs: am.static_configs,
        ...(am.scheme && { scheme: am.scheme }),
        ...(am.timeout && { timeout: am.timeout }),
        ...(am.api_version && { api_version: am.api_version }),
      }))
    };
  }
  
  // Add rule files if present
  if (config.rule_files?.length) {
    yamlObj.rule_files = config.rule_files;
  }
  
  // Add remote write if present
  if (config.remote_write?.length) {
    yamlObj.remote_write = config.remote_write.map(rw => ({
      url: rw.url,
      ...(rw.name && { name: rw.name }),
      ...(rw.remote_timeout && { remote_timeout: rw.remote_timeout }),
      ...(rw.write_relabel_configs && { write_relabel_configs: rw.write_relabel_configs }),
      ...(rw.basic_auth && { basic_auth: rw.basic_auth }),
    }));
  }
  
  // Add scrape configs
  yamlObj.scrape_configs = config.scrape_configs.map(sc => ({
    job_name: sc.job_name,
    ...(sc.scrape_interval && { scrape_interval: sc.scrape_interval }),
    ...(sc.scrape_timeout && { scrape_timeout: sc.scrape_timeout }),
    ...(sc.metrics_path && { metrics_path: sc.metrics_path }),
    ...(sc.scheme && { scheme: sc.scheme }),
    static_configs: sc.static_configs,
    ...(sc.basic_auth && { basic_auth: sc.basic_auth }),
    ...(sc.relabel_configs && { relabel_configs: sc.relabel_configs }),
  }));
  
  return yamlObj;
}

// Parse YAML string into structured object
export function parseYaml(yamlString: string): PrometheusConfig | null {
  try {
    // This is a placeholder since we can't use js-yaml directly
    // In a real implementation, this would use js-yaml.load(yamlString)
    return null;
  } catch (error) {
    console.error("Error parsing YAML:", error);
    return null;
  }
}

// Generate default configuration
export function getDefaultConfig(): PrometheusConfig {
  return {
    global: {
      scrape_interval: "15s",
      evaluation_interval: "15s",
      external_labels: {
        monitor: "example"
      }
    },
    alerting: {
      alertmanagers: [
        {
          static_configs: [
            {
              targets: ["localhost:9093"]
            }
          ]
        }
      ]
    },
    rule_files: [
      "rules/*.yaml"
    ],
    scrape_configs: [
      {
        job_name: "prometheus",
        scrape_interval: "15s",
        scrape_timeout: "10s",
        metrics_path: "/metrics",
        scheme: "http",
        static_configs: [
          {
            targets: ["localhost:9090"],
            labels: {
              environment: "production",
            },
          },
        ],
      }
    ]
  };
}

export function formatDuration(value: string): string {
  if (!value) return value;
  
  // If value is just a number, add seconds suffix
  if (/^\d+$/.test(value)) {
    return `${value}s`;
  }
  
  // If value already has suffix, return as is
  if (/^\d+[smhdwy]$/.test(value)) {
    return value;
  }
  
  return value;
}

// Validate a target string (host:port format)
export function isValidTarget(target: string): boolean {
  // Simple check for host:port format
  return /^[a-zA-Z0-9.-]+:\d+$/.test(target);
}

// Convert a JS object to pretty-printed YAML
export function objectToYamlString(obj: Record<string, any>): string {
  // This is a placeholder for js-yaml.dump(obj, { lineWidth: -1 })
  // Since we can't use js-yaml directly
  return JSON.stringify(obj, null, 2);
}
