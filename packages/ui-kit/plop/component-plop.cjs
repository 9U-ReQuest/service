const path = require("path");
const fs = require("fs");

module.exports = function (plop) {
  plop.setGenerator("component", {
    description: "컴포넌트 생성",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "컴포넌트 이름을 입력하세요:",
      },
    ],
    actions: [
      {
        type: "add",
        path: path.join(
          process.cwd(),
          "src",
          "components",
          "{{kebabCase name}}",
          "{{kebabCase name}}.tsx",
        ),
        templateFile: path.join(__dirname, "plop-template", "component.tsx.hbs"),
      },
      {
        type: "add",
        path: path.join(
          process.cwd(),
          "src",
          "components",
          "{{kebabCase name}}",
          "{{kebabCase name}}.stories.tsx",
        ),
        templateFile: path.join(__dirname, "plop-template", "component.stories.tsx.hbs"),
      },
      {
        type: "add",
        path: path.join(process.cwd(), "src", "components", "{{kebabCase name}}", "index.ts"),
        templateFile: path.join(__dirname, "plop-template", "index.ts.hbs"),
      },
      {
        type: "append",
        path: path.join(process.cwd(), "src", "components", "index.ts"),
        template:
          "export { default as {{pascalCase name}} } from './{{kebabCase name}}';\nexport type { {{pascalCase name}}Props } from './{{kebabCase name}}';\n",
        skipIfExists: false,
        transform: (content, data) => {
          const indexPath = path.join(process.cwd(), "src", "components", "index.ts");
          if (!fs.existsSync(indexPath)) {
            return data.template;
          }
          const componentName = plop.getHelper("pascalCase")(data.name);
          if (content.includes(`export { default as ${componentName} }`)) {
            return ""; // 이미 존재하는 경우 아무것도 추가하지 않음
          }
          return content ? `${content}\n${data.template}` : data.template;
        },
      },
    ],
  });
};
