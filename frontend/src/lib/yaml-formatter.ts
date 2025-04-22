

/**
 * A basic YAML formatter for displaying YAML output
 * Note: This is a simplified formatter, not a full YAML implementation
 */

export function formatObjectToYaml(obj: Record<string, any>, indent = 0): string {
  let yaml = '';
  const spaces = ' '.repeat(indent);
  
  Object.entries(obj).forEach(([key, value]) => {
    // Handle arrays
    if (Array.isArray(value)) {
      yaml += `${spaces}${key}:\n`;
      value.forEach(item => {
        if (typeof item === 'object' && item !== null) {
          yaml += `${spaces}- \n${formatObjectToYaml(item, indent + 2).replace(/^/gm, spaces + '  ')}`;
        } else {
          yaml += `${spaces}- ${item}\n`;
        }
      });
    }
    // Handle nested objects
    else if (typeof value === 'object' && value !== null) {
      yaml += `${spaces}${key}:\n${formatObjectToYaml(value, indent + 2)}`;
    }
    // Handle primitive values
    else {
      yaml += `${spaces}${key}: ${value}\n`;
    }
  });
  
  return yaml;
}

export function formatYaml(obj: Record<string, any>): string {
  return formatObjectToYaml(obj);
}
