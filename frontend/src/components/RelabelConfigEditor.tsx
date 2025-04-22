
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PrometheusConfig } from "@/lib/types";

export interface RelabelConfigEditorProps {
  index: number;
  form: UseFormReturn<PrometheusConfig>;
  onRemove: () => void;
}

export function RelabelConfigEditor({ index, form, onRemove }: RelabelConfigEditorProps) {
  const { setValue, watch } = form;
  const relabelConfig = watch(`scrape_configs.0.relabel_configs.${index}`);
  
  // Add a new source label
  const addSourceLabel = () => {
    const currentLabels = [...(relabelConfig.source_labels || [])];
    currentLabels.push("__address__");
    setValue(`scrape_configs.0.relabel_configs.${index}.source_labels`, currentLabels);
  };
  
  // Remove a source label
  const removeSourceLabel = (labelIndex: number) => {
    const currentLabels = [...(relabelConfig.source_labels || [])];
    currentLabels.splice(labelIndex, 1);
    setValue(`scrape_configs.0.relabel_configs.${index}.source_labels`, currentLabels);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium">Relabel Config {index + 1}</h4>
          <Button 
            type="button"
            variant="outline" 
            size="sm"
            onClick={onRemove}
          >
            Remove
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Action */}
          <FormField
            control={form.control}
            name={`scrape_configs.0.relabel_configs.${index}.action`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Action</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an action" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="replace">replace</SelectItem>
                    <SelectItem value="keep">keep</SelectItem>
                    <SelectItem value="drop">drop</SelectItem>
                    <SelectItem value="hashmod">hashmod</SelectItem>
                    <SelectItem value="labelmap">labelmap</SelectItem>
                    <SelectItem value="labeldrop">labeldrop</SelectItem>
                    <SelectItem value="labelkeep">labelkeep</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Target Label */}
          <FormField
            control={form.control}
            name={`scrape_configs.0.relabel_configs.${index}.target_label`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Label</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="instance" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Source Labels */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <FormLabel>Source Labels</FormLabel>
              <Button 
                type="button"
                variant="outline" 
                size="sm"
                onClick={addSourceLabel}
              >
                Add Source Label
              </Button>
            </div>
            
            <div className="space-y-2">
              {relabelConfig.source_labels && relabelConfig.source_labels.map((label, labelIndex) => (
                <div key={labelIndex} className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name={`scrape_configs.0.relabel_configs.${index}.source_labels.${labelIndex}`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input {...field} placeholder="__address__" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeSourceLabel(labelIndex)}
                    className="h-10 w-10 p-0 flex items-center justify-center"
                  >
                    &times;
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Regex */}
          <FormField
            control={form.control}
            name={`scrape_configs.0.relabel_configs.${index}.regex`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Regex</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="(.*)" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Replacement */}
          <FormField
            control={form.control}
            name={`scrape_configs.0.relabel_configs.${index}.replacement`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Replacement</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="$1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
