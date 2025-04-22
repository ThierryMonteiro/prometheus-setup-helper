
import React from 'react';
import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

export function AlertingConfigEditor() {
  const form = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "alerting.alertmanagers"
  });
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alerting Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field, index) => (
          <Card key={field.id}>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-end">
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => remove(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              
              <FormField
                control={form.control}
                name={`alerting.alertmanagers.${index}.scheme`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scheme</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="http" />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`alerting.alertmanagers.${index}.timeout`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timeout</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="10s" />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              {/* Static Configs for Alertmanagers */}
              <div className="space-y-4">
                <h4 className="font-medium">Alertmanager Targets</h4>
                {form.watch(`alerting.alertmanagers.${index}.static_configs`)?.map((staticConfig, staticIndex) => (
                  <div key={staticIndex} className="space-y-2 p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <h5 className="text-sm font-medium">Target Group {staticIndex + 1}</h5>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const configs = [...form.watch(`alerting.alertmanagers.${index}.static_configs`)];
                          configs.splice(staticIndex, 1);
                          form.setValue(`alerting.alertmanagers.${index}.static_configs`, configs);
                        }}
                      >
                        Remove Group
                      </Button>
                    </div>
                    
                    {/* Targets */}
                    <div className="space-y-2">
                      {staticConfig.targets && staticConfig.targets.map((target, targetIndex) => (
                        <div key={targetIndex} className="flex items-center gap-2">
                          <FormField
                            control={form.control}
                            name={`alerting.alertmanagers.${index}.static_configs.${staticIndex}.targets.${targetIndex}`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input {...field} placeholder="localhost:9093" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const targets = [...staticConfig.targets];
                              targets.splice(targetIndex, 1);
                              form.setValue(`alerting.alertmanagers.${index}.static_configs.${staticIndex}.targets`, targets);
                            }}
                            className="h-10 w-10 p-0 flex items-center justify-center"
                          >
                            &times;
                          </Button>
                        </div>
                      ))}
                      
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const targets = [...staticConfig.targets];
                          targets.push("localhost:9093");
                          form.setValue(`alerting.alertmanagers.${index}.static_configs.${staticIndex}.targets`, targets);
                        }}
                      >
                        Add Target
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const configs = form.getValues(`alerting.alertmanagers.${index}.static_configs`) || [];
                    configs.push({ targets: ["localhost:9093"] });
                    form.setValue(`alerting.alertmanagers.${index}.static_configs`, configs);
                  }}
                >
                  Add Target Group
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Button
          type="button"
          variant="outline"
          onClick={() => append({
            static_configs: [{ targets: ["localhost:9093"] }],
            scheme: "http"
          })}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Alertmanager
        </Button>
      </CardContent>
    </Card>
  );
}
