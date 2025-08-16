module.exports = function (plop) {
  // Component generator
  plop.setGenerator('component', {
    description:
      'Create a new component in its own folder with named export and type definitions',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (e.g., Button):',
      },
    ],
    actions: [
      // Component implementation file
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{camelCase name}}.tsx',
        templateFile: 'plop-templates/component/component.tsx.hbs',
      },
      // Index file that exports the component as named export
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/index.ts',
        templateFile: 'plop-templates/component/index.ts.hbs',
      },
      // Styled-components file for the component
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{camelCase name}}.styles.ts',
        templateFile: 'plop-templates/component/component.styles.ts.hbs',
      },
      // Type definitions file for the component
      {
        type: 'add',
        path: 'src/types/componentTypes/{{pascalCase name}}Types.ts',
        templateFile: 'plop-templates/component/component.types.hbs',
      },
    ],
  });

  // Page generator
  plop.setGenerator('page', {
    description:
      'Create a new page in its own folder with named export and type definitions',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Page name (e.g., Home):',
      },
    ],
    actions: [
      // Page implementation file
      {
        type: 'add',
        path: 'src/pages/{{pascalCase name}}/{{camelCase name}}.tsx',
        templateFile: 'plop-templates/page/page.tsx.hbs',
      },
      // Index file that exports the page as named export
      {
        type: 'add',
        path: 'src/pages/{{pascalCase name}}/index.ts',
        templateFile: 'plop-templates/page/index.ts.hbs',
      },
      // Styled-components file for the page
      {
        type: 'add',
        path: 'src/pages/{{pascalCase name}}/{{camelCase name}}.styles.ts',
        templateFile: 'plop-templates/page/page.styles.ts.hbs',
      },
      // Type definitions file for the page
      {
        type: 'add',
        path: 'src/types/moduleTypes/{{pascalCase name}}Types.ts',
        templateFile: 'plop-templates/page/page.types.hbs',
      },
    ],
  });

  // Redux slice generator
  plop.setGenerator('slice', {
    description:
      'Create a new redux slice with selectors, reducer, and type definitions',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Slice name (e.g., user):',
      },
    ],
    actions: [
      // Slice file with createSlice logic
      {
        type: 'add',
        path: 'src/store/slices/{{camelCase name}}Slice.ts',
        templateFile: 'plop-templates/slice/slice.ts.hbs',
      },
      // Type definitions file for the slice
      {
        type: 'add',
        path: 'src/types/reduxTypes/{{camelCase name}}Slice.ts',
        templateFile: 'plop-templates/slice/slice.types.hbs',
      },
    ],
  });
};
