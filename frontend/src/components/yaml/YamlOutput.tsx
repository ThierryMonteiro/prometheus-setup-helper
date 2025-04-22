
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import SendYamlButton from "./SendYamlButton.tsx";
import { PrometheusConfig } from "@/lib/types.ts";
import yaml from 'js-yaml';

interface YamlOutputProps {
  yamlOutput: FormValues;
  onBack: () => void;
}


interface FormValues {
  global?: Record<string, any>;
  alerting?: Record<string, any>;
  rule_files?: string[];
  remote_write?: Record<string, any>[];
  scrape_configs?: Record<string, any>[];
  target_groups?: { group: string; targets: { address: string }[] }[];
}

export function YamlOutput({ yamlOutput, onBack }: YamlOutputProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium text-lg mb-2">YAML Output</h3>
        <div className="bg-gray-100 rounded-md p-4">
          <Textarea
            className="font-mono h-96"
            value={yaml.dump(yamlOutput)}
            readOnly
          />
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
        >
          Back to Editor
        </Button>
        
        <Button 
          onClick={() => {
            navigator.clipboard.writeText(yaml.dump(yamlOutput));
            alert("YAML copied to clipboard!");
          }}
        >
          Copy to Clipboard
        </Button>

        <SendYamlButton yamlOutput={yamlOutput} />

      </div>
    </div>
  );
}
