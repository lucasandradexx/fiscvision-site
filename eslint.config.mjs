import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "node_modules/**",
      // mockup original do editor visual, mantido apenas como referência
      "FiscVision fiscal intelligence site/**",
    ],
  },
];

export default eslintConfig;
