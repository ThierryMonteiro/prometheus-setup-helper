
import React from 'react';
import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

export function RemoteWriteEditor() {
  const form = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "remote_write"
  });
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Remote Write Configuration</CardTitle>
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
                name={`remote_write.${index}.url`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="http://remote-write-endpoint/api/v1/write" />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`remote_write.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="remote_name" />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`remote_write.${index}.remote_timeout`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remote Timeout</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="30s" />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              {/* Basic Auth */}
              <div className="space-y-4">
                <h4 className="font-medium">Basic Authentication</h4>
                <FormField
                  control={form.control}
                  name={`remote_write.${index}.basic_auth.username`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name={`remote_write.${index}.basic_auth.password`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Write Relabel Configs */}
              <div className="space-y-4">
                <h4 className="font-medium">Write Relabel Configurations</h4>
                {form.watch(`remote_write.${index}.write_relabel_configs`)?.map((relabelConfig, relabelIndex) => (
                  <Card key={relabelIndex}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center mb-4">
                        <h5 className="text-sm font-medium">Relabel Config {relabelIndex + 1}</h5>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const configs = [...form.watch(`remote_write.${index}.write_relabel_configs`)];
                            configs.splice(relabelIndex, 1);
                            form.setValue(`remote_write.${index}.write_relabel_configs`, configs);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Action */}
                        <FormField
                          control={form.control}
                          name={`remote_write.${index}.write_relabel_configs.${relabelIndex}.action`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Action</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="replace" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        {/* Target Label */}
                        <FormField
                          control={form.control}
                          name={`remote_write.${index}.write_relabel_configs.${relabelIndex}.target_label`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Target Label</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="instance" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const configs = form.getValues(`remote_write.${index}.write_relabel_configs`) || [];
                    configs.push({ 
                      source_labels: ["__address__"],
                      target_label: "instance",
                      replacement: "$1",
                      action: "replace"
                    });
                    form.setValue(`remote_write.${index}.write_relabel_configs`, configs);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Relabel Config
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Button
          type="button"
          variant="outline"
          onClick={() => append({
            url: "",
            remote_timeout: "30s"
          })}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Remote Write
        </Button>
      </CardContent>
    </Card>
  );
}
