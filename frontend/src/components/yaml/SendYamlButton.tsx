import React from 'react';
import axios from 'axios'; // use axios for clean request handling
import yaml from 'js-yaml';
import { generatePrometheusYaml } from '@/utils/generatePrometheusYaml';

function SendYamlButton({ yamlOutput }: { yamlOutput: any }) {
  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:8000/editor/configs/save/',generatePrometheusYaml(yamlOutput), {
        headers: {
         'Content-Type': 'text/plain',
        },
      });
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error sending YAML:', error);
    }
  };

  return (
    <button onClick={handleClick} className="p-2 bg-blue-500 text-white rounded">
      Send YAML to API
    </button>
  );
}

export default SendYamlButton;
