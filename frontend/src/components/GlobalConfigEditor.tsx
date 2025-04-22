
import React from 'react';
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

export function GlobalConfigEditor() {
  const form = useFormContext();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Global Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="global.scrape_interval"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Global Scrape Interval</FormLabel>
              <FormControl>
                <Input {...field} placeholder="15s" />
              </FormControl>
              <FormDescription>
                How frequently to scrape targets by default
              </FormDescription>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="global.evaluation_interval"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Evaluation Interval</FormLabel>
              <FormControl>
                <Input {...field} placeholder="15s" />
              </FormControl>
              <FormDescription>
                How frequently to evaluate rules
              </FormDescription>
            </FormItem>
          )}
        />
        
        {/* External Labels */}
        <div>
          <FormLabel>External Labels</FormLabel>
          <div className="space-y-2">
            {Object.entries(form.watch("global.external_labels") || {}).map(([key, value], index) => (
              <div key={key} className="flex gap-2">
                <Input
                  value={key}
                  onChange={(e) => {
                    const newLabels = { ...form.getValues("global.external_labels") };
                    const oldValue = newLabels[key];
                    delete newLabels[key];
                    newLabels[e.target.value] = oldValue;
                    form.setValue("global.external_labels", newLabels);
                  }}
                  placeholder="Label name"
                />
                <Input
                  value={value as string}
                  onChange={(e) => {
                    const newLabels = { ...form.getValues("global.external_labels") };
                    newLabels[key] = e.target.value;
                    form.setValue("global.external_labels", newLabels);
                  }}
                  placeholder="Label value"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => {
                    const newLabels = { ...form.getValues("global.external_labels") };
                    delete newLabels[key];
                    form.setValue("global.external_labels", newLabels);
                  }}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const newLabels = { ...form.getValues("global.external_labels") };
                newLabels[`label_${Object.keys(newLabels).length}`] = "";
                form.setValue("global.external_labels", newLabels);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Label
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
