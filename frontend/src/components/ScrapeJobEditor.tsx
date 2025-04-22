
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { RelabelConfigEditor } from "./RelabelConfigEditor";
import { GlobalConfigEditor } from "./GlobalConfigEditor";
import { AlertingConfigEditor } from "./AlertingConfigEditor";
import { RuleFilesEditor } from "./RuleFilesEditor";
import { RemoteWriteEditor } from "./RemoteWriteEditor";
import { YamlOutput } from "./yaml/YamlOutput";
import { BasicJobConfig } from "./job/BasicJobConfig";
import { SavedConfigs } from "./SavedConfigs";
import { PrometheusConfig } from "@/lib/types";
import { formatYaml } from "@/lib/yaml-formatter";
import { ScrapeConfigEditor } from "./ScrapeConfigEditor.tsx";
import { TargetGroupsEditor } from "./TargetGroupsEditor.tsx";
import yaml from 'js-yaml';
import { generatePrometheusYaml } from "@/utils/generatePrometheusYaml"; // adjust path if needed

// Helper functions to handle YAML
const configToYaml = (config: PrometheusConfig): Record<string, any> => {
  const yamlObj: Record<string, any> = {};

  // Add global config if present
  if (config.global && typeof config.global === 'object') {
    yamlObj.global = { ...config.global };
  }

  // Add alerting config if present
  if (Array.isArray(config.alerting?.alertmanagers) && config.alerting.alertmanagers.length > 0) {
    yamlObj.alerting = {
      alertmanagers: config.alerting.alertmanagers.map(am => {
        const alertManager: Record<string, any> = {};
        if (Array.isArray(am.static_configs) && am.static_configs.length > 0) {
          alertManager.static_configs = am.static_configs;
        }
        if (am.scheme) alertManager.scheme = am.scheme;
        if (am.timeout) alertManager.timeout = am.timeout;
        if (am.api_version) alertManager.api_version = am.api_version;
        return alertManager;
      })
    };
  }

  // Add rule files if present
  if (Array.isArray(config.rule_files) && config.rule_files.length > 0) {
    yamlObj.rule_files = config.rule_files;
  }

  // Add remote write if present
  if (Array.isArray(config.remote_write) && config.remote_write.length > 0) {
    yamlObj.remote_write = config.remote_write.map(rw => {
      const remote: Record<string, any> = {};
      if (rw.url) remote.url = rw.url;
      if (rw.name) remote.name = rw.name;
      if (rw.remote_timeout) remote.remote_timeout = rw.remote_timeout;
      if (rw.write_relabel_configs) remote.write_relabel_configs = rw.write_relabel_configs;
      if (rw.basic_auth && rw.basic_auth.username && rw.basic_auth.password) {
        remote.basic_auth = {
          username: rw.basic_auth.username,
          password: rw.basic_auth.password,
        };
      }
      return remote;
    });
  }

  // Add scrape configs properly
  if (Array.isArray(config.scrape_configs) && config.scrape_configs.length > 0) {
    yamlObj.scrape_configs = config.scrape_configs.map(sc => {
      const scrape: Record<string, any> = {};

      if (sc.job_name) scrape.job_name = sc.job_name;
      if (sc.scrape_interval) scrape.scrape_interval = sc.scrape_interval;
      if (sc.scrape_timeout) scrape.scrape_timeout = sc.scrape_timeout;
      if (sc.metrics_path) scrape.metrics_path = sc.metrics_path;
      if (sc.scheme) scrape.scheme = sc.scheme;

      if (Array.isArray(sc.static_configs) && sc.static_configs.length > 0) {
        scrape.static_configs = sc.static_configs.map(staticConfig => {
          const staticObj: Record<string, any> = {};
          if (Array.isArray(staticConfig.targets) && staticConfig.targets.length > 0) {
            staticObj.targets = staticConfig.targets;
          }
          if (staticConfig.labels && typeof staticConfig.labels === 'object') {
            staticObj.labels = staticConfig.labels;
          }
          return staticObj;
        });
      }

      if (sc.basic_auth && sc.basic_auth.username && sc.basic_auth.password) {
        scrape.basic_auth = {
          username: sc.basic_auth.username,
          password: sc.basic_auth.password,
        };
      }

      if (Array.isArray(sc.relabel_configs) && sc.relabel_configs.length > 0) {
        scrape.relabel_configs = sc.relabel_configs;
      }

      return scrape;
    });
  }

  return yamlObj;
};


const formatDuration = (value: string): string => {
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
};

const getDefaultConfig = (): PrometheusConfig => {
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
};

export function ScrapeJobEditor() {
  const [activeTab, setActiveTab] = useState("form");
  const [yamlOutput, setYamlOutput] = useState("");
  const [storedConfigs, setStoredConfigs] = useState<{ name: string, config: PrometheusConfig }[]>([]);

  const form = useForm<PrometheusConfig>({
    defaultValues: getDefaultConfig()
  });

  const { watch, setValue, handleSubmit, reset, formState } = form;
  const formValues = watch();

  useEffect(() => {
    const yamlObj = configToYaml(formValues);
    try {
      setYamlOutput(formatYaml(yamlObj));
    } catch (error) {
      console.error("Error generating YAML:", error);
      setYamlOutput("# Error generating YAML");
    }
  }, [formValues]);

  const saveConfig = () => {
    const currentConfig = form.getValues();
    const newStoredConfigs = [...storedConfigs];

    const existingIndex = newStoredConfigs.findIndex(c => c.name === currentConfig.scrape_configs[0].job_name);

    if (existingIndex >= 0) {
      newStoredConfigs[existingIndex] = {
        name: currentConfig.scrape_configs[0].job_name,
        config: currentConfig
      };
    } else {
      newStoredConfigs.push({
        name: currentConfig.scrape_configs[0].job_name,
        config: currentConfig
      });
    }

    setStoredConfigs(newStoredConfigs);
    alert(`Configuration "${currentConfig.scrape_configs[0].job_name}" saved!`);
  };

  const loadConfig = (configName: string) => {
    const config = storedConfigs.find(c => c.name === configName);
    if (config) {
      reset(config.config);
    }
  };

  const newConfig = () => {
    if (confirm("Create a new scrape job? This will discard any unsaved changes.")) {
      reset(getDefaultConfig());
    }
  };

  const onSubmit = (data: PrometheusConfig) => {
    if (data.scrape_configs[0].scrape_interval) {
      data.scrape_configs[0].scrape_interval = formatDuration(data.scrape_configs[0].scrape_interval);
    }
    if (data.scrape_configs[0].scrape_timeout) {
      data.scrape_configs[0].scrape_timeout = formatDuration(data.scrape_configs[0].scrape_timeout);
    }

    console.log(data)
    const yamlObj = generatePrometheusYaml(data);
    console.log("Generated YAML:", yamlObj);

    const yamlString = yaml.dump(yamlObj);
    console.log("Generated YAML:", yamlString);

    setYamlOutput(yamlObj);
    setActiveTab("yaml");


  };

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Prometheus Configuration Editor</CardTitle>
          <CardDescription>
            Configure your complete Prometheus setup with a user-friendly interface
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="form">Form Editor</TabsTrigger>
              <TabsTrigger value="yaml">YAML Output</TabsTrigger>
            </TabsList>

            <TabsContent value="form">

              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}  className="space-y-6">
                  <GlobalConfigEditor />
                  <AlertingConfigEditor />
                  <RuleFilesEditor />
                  <RemoteWriteEditor />
                  <TargetGroupsEditor /> 

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={newConfig}>
                      New Config
                    </Button>
                    <Button type="button" variant="secondary" onClick={saveConfig}>
                      Save Config
                    </Button>
                    <Button type="submit">Generate YAML</Button>
                  </div>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="yaml">
              <YamlOutput
                yamlOutput = {formValues}
                onBack={() => setActiveTab("form")}
              />
            </TabsContent>
          </Tabs>
        </CardContent>

        <SavedConfigs
          storedConfigs={storedConfigs}
          onLoadConfig={loadConfig}
        />
      </Card>
    </div>
  );
}
