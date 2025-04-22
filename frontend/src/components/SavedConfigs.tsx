
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CardFooter } from "@/components/ui/card";
import { PrometheusConfig } from "@/lib/types";

interface SavedConfigsProps {
  storedConfigs: { name: string; config: PrometheusConfig }[];
  onLoadConfig: (configName: string) => void;
}

export function SavedConfigs({ storedConfigs, onLoadConfig }: SavedConfigsProps) {
  if (storedConfigs.length === 0) return null;

  return (
    <CardFooter className="flex justify-between">
      <div className="text-sm text-gray-500">
        Saved Configurations: {storedConfigs.length}
      </div>
      
      <Select onValueChange={onLoadConfig}>
        <SelectTrigger className="w-56">
          <SelectValue placeholder="Load saved configuration" />
        </SelectTrigger>
        <SelectContent>
          {storedConfigs.map((config) => (
            <SelectItem key={config.name} value={config.name}>
              {config.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </CardFooter>
  );
}
