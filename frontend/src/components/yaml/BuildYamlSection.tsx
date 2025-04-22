function buildYamlSection(schema: any, data: any): any {
    const output: any = {};
  
    for (const key in schema) {
      const sectionSchema = schema[key];
      const sectionData = data[key];
  
      if (sectionData === undefined || sectionData === null) {
        if (sectionSchema.required) {
          throw new Error(`Missing required section: ${key}`);
        }
        continue;
      }
  
      if (sectionSchema.array) {
        if (!Array.isArray(sectionData)) {
          throw new Error(`Expected array for ${key}`);
        }
        output[key] = sectionData.map((item: any) => {
          if (sectionSchema.fields) {
            const cleanedItem: any = {};
            for (const field of sectionSchema.fields) {
              if (item[field] !== undefined) {
                cleanedItem[field] = item[field];
              }
            }
            return cleanedItem;
          }
          return item;
        });
      } else if (sectionSchema.nested) {
        const nestedOutput: any = {};
        for (const nestedKey in sectionSchema.nested) {
          if (sectionData[nestedKey] !== undefined) {
            const nestedSchema = sectionSchema.nested[nestedKey];
            if (nestedSchema.array && Array.isArray(sectionData[nestedKey])) {
              nestedOutput[nestedKey] = sectionData[nestedKey].map((item: any) => {
                const cleanedItem: any = {};
                for (const field of nestedSchema.fields || []) {
                  if (item[field] !== undefined) {
                    cleanedItem[field] = item[field];
                  }
                }
                return cleanedItem;
              });
            }
          }
        }
        output[key] = nestedOutput;
      } else if (sectionSchema.fields) {
        const cleanedSection: any = {};
        for (const field of sectionSchema.fields) {
          if (sectionData[field] !== undefined) {
            cleanedSection[field] = sectionData[field];
          }
        }
        output[key] = cleanedSection;
      } else {
        output[key] = sectionData;
      }
    }
  
    return output;
  }
export default buildYamlSection;  