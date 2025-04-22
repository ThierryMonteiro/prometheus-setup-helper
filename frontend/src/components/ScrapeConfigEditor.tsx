"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";

export function ScrapeConfigEditor() {
  const { control, register } = useFormContext();
  const { fields: scrapeFields } = useFieldArray({
    control,
    name: "scrape_configs",
  });

  const handleAddScrapeConfig = () => {
    const scrape_configs = {
      job_name: '',
      scrape_interval: '',
      scrape_timeout: '',
      metrics_path: '',
      scheme: '',
      static_configs: [],
      basic_auth: { username: '', password: '' },
      relabel_configs: [],
    };
    useFieldArray({ control, name: "scrape_configs" }).append(scrape_configs);
  };

  return (
    <div className="space-y-6">
      <h3 className="font-medium text-lg">Scrape Configurations</h3>

      {scrapeFields.map((scrapeConfig, scrapeIndex) => {
        const staticConfigName = `scrape_configs.${scrapeIndex}.static_configs`;
        const { fields: staticFields, append: appendStatic, remove: removeStatic } = useFieldArray({
          control,
          name: staticConfigName,
        });

        return (
          <div key={scrapeConfig.id} className="border p-4 rounded-lg space-y-4 bg-muted">
            <div>
              <label className="block text-sm font-medium">Job Name</label>
              <input {...register(`scrape_configs.${scrapeIndex}.job_name`)} className="input" />
            </div>

            {/* STATIC CONFIG GROUPS */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold">Static Target Groups</h4>

              {staticFields.map((staticConfig, staticIndex) => (
                <div key={staticConfig.id} className="border p-2 rounded-md">
                  <div>
                    <label className="block text-sm">Target</label>
                    <input
                      {...register(`scrape_configs.${scrapeIndex}.static_configs.${staticIndex}.targets.0`)}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm">Label Group</label>
                    <input
                      {...register(`scrape_configs.${scrapeIndex}.static_configs.${staticIndex}.labels.group`)}
                      className="input"
                    />
                  </div>

                  <Button type="button" variant="destructive" onClick={() => removeStatic(staticIndex)}>
                    Remove Target Group
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  appendStatic({
                    targets: [''],
                    labels: { group: '' },
                  })
                }
              >
                Add Target Group
              </Button>
            </div>

            {/* REMOVE SCRAPE CONFIG */}
            <Button
              type="button"
              variant="destructive"
              onClick={() => useFieldArray({ control, name: "scrape_configs" }).remove(scrapeIndex)}
            >
              Remove Scrape Config
            </Button>
          </div>
        );
      })}

      <Button type="button" onClick={handleAddScrapeConfig}>
        Add New Scrape Config
      </Button>
    </div>
  );
}
