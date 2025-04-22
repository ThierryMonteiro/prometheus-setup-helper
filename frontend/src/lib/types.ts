
import { UseFormReturn } from "react-hook-form";

export type PrometheusConfig = {
  global?: GlobalConfig;
  alerting?: AlertingConfig;
  rule_files?: string[];
  remote_write?: RemoteWriteConfig[];
  scrape_configs: ScrapeJobConfig[];
};

export type GlobalConfig = {
  scrape_interval?: string;
  evaluation_interval?: string;
  scrape_timeout?: string;
  external_labels?: Record<string, string>;
};

export type AlertingConfig = {
  alertmanagers?: AlertmanagerConfig[];
};

export type AlertmanagerConfig = {
  static_configs: StaticConfig[];
  scheme?: string;
  timeout?: string;
  api_version?: string;
};

export type RemoteWriteConfig = {
  url: string;
  name?: string;
  remote_timeout?: string;
  write_relabel_configs?: RelabelConfig[];
  basic_auth?: BasicAuth;
};

export type ScrapeJobConfig = {
  job_name: string;
  scrape_interval?: string;
  scrape_timeout?: string;
  metrics_path?: string;
  scheme?: string;
  static_configs: StaticConfig[];
  basic_auth?: BasicAuth;
  relabel_configs?: RelabelConfig[];
};

export type StaticConfig = {
  targets: string[];
  labels?: Record<string, string>;
};

export type BasicAuth = {
  username: string;
  password: string;
};

export type RelabelConfig = {
  source_labels: string[];
  target_label: string;
  regex?: string;
  replacement?: string;
  action?: string;
};

export type fieldSchemas = {
  global: {
    required: false,
    fields: ['scrape_interval', 'evaluation_interval', 'external_labels'],
  },
  alerting: {
    required: false,
    nested: {
      alertmanagers: {
        required: false,
        array: true,
        fields: ['static_configs', 'scheme', 'timeout', 'api_version'],
      }
    }
  },
  rule_files: {
    required: false,
    array: true,
  },
  remote_write: {
    required: false,
    array: true,
    fields: ['url', 'name', 'remote_timeout', 'write_relabel_configs', 'basic_auth'],
  },
  scrape_configs: {
    required: true,
    array: true, // Allow multiple scrape_configs
    fields: [
      'job_name', 'scrape_interval', 'scrape_timeout', 'metrics_path', 'scheme',
      'static_configs', 'basic_auth', 'relabel_configs'
    ],
  }
};