
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { PrometheusConfig } from "@/lib/types";

interface BasicJobConfigProps {
  form: UseFormReturn<PrometheusConfig>;
}

export function BasicJobConfig({ form }: BasicJobConfigProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Basic Configuration</h3>
        
        <FormField
          control={form.control}
          name="scrape_configs.0.job_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="my_scrape_job" />
              </FormControl>
              <FormDescription>
                Unique name for this scrape job
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="scrape_configs.0.scrape_interval"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Scrape Interval</FormLabel>
              <FormControl>
                <Input {...field} placeholder="15s" />
              </FormControl>
              <FormDescription>
                How frequently to scrape targets (e.g., 15s, 1m)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="scrape_configs.0.scrape_timeout"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Scrape Timeout</FormLabel>
              <FormControl>
                <Input {...field} placeholder="10s" />
              </FormControl>
              <FormDescription>
                Timeout for scrape requests
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Endpoint Configuration</h3>
        
        <FormField
          control={form.control}
          name="scrape_configs.0.metrics_path"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Metrics Path</FormLabel>
              <FormControl>
                <Input {...field} placeholder="/metrics" />
              </FormControl>
              <FormDescription>
                Path to metrics endpoint
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="scrape_configs.0.scheme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Scheme</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a scheme" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="http">HTTP</SelectItem>
                  <SelectItem value="https">HTTPS</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                HTTP or HTTPS
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="pt-2">
          <h4 className="font-medium">Basic Authentication (Optional)</h4>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <FormField
              control={form.control}
              name="scrape_configs.0.basic_auth.username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="scrape_configs.0.basic_auth.password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
