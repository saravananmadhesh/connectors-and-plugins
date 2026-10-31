# Testing the Vue Grid with Jest

## Table of Contents

- [Overview](#overview)
- [When to Use](#when-to-use)
- [Setup Jest Environment](#setup-jest-environment)
- [Adding Grid Component](#adding-grid-component)
- [Creating Test Cases](#creating-test-cases)
- [Snapshot Testing](#snapshot-testing)
- [DOM Testing](#dom-testing)
- [Running Tests](#running-tests)

## Overview

Vue Jest testing is a popular approach to test Vue applications using the Jest testing framework. This involves creating and executing unit tests specifically designed for Vue components. By conducting unit testing, which focuses on testing isolated units of code like functions, methods, and components, you ensure they behave as expected. 

Unit testing validates individual units of your Vue components, catches potential bugs early in the development process, and maintains the reliability and stability of your Vue application. Jest provides a comprehensive testing framework for Vue components with features like snapshot testing, DOM testing, and mocking capabilities.

## When to Use

Use Jest testing to:
- Validate Grid component behavior and functionality
- Ensure data is correctly populated in the Grid
- Test component rendering and DOM interactions
- Create snapshots for regression testing
- Verify Grid properties and methods work as expected
- Catch bugs early before deployment
- Maintain code quality and stability
- Test data source configurations
- Validate Grid responses to user interactions

## Setup Jest Environment

### Step 1: Verify Node Version

You need to verify if the installed version of Node is 14 or higher. If it is below version 14, you must install a version of Node above 14. You can refer to the Node.js download page to install a version 14 or above.

### Step 2: Create Vue Application and Install Grid Package

To create a Vue application and install the Syncfusion Grid package, refer to the Getting Started documentation. This provides the foundational setup for your Vue project with dependencies.

### Step 3: Install Jest

Run the following command to install the Jest dependency using npm:

```
npm install --save-dev jest
```

### Step 4: Add Unit Jest Test Case Environment

Run the following command to add the unit jest test case environment:

```
vue add unit-jest
npm install jest-environment-jsdom --save-dev
```

### Step 5: Add Test Command in package.json

You should verify that the test command is specified in the script section of the package.json file. If the `script` section does not specify the test command, you must define the test command in the script section:

```json
"test": "jest"
```

## Adding Grid Component

### Component Setup

Refer to the getting-started documentation to add the styling for the Grid component. The following code demonstrates how to create a Grid component for testing:

**App.vue:**

```vue
<template>
  <div id="app">
      <ejs-grid  id='Grid' :dataSource='data.slice(0,5)' height='315'>
          <e-columns>
              <e-column field='CustomerID' headerText='CustomerID' textAlign='Right' width=90></e-column>
              <e-column field='ContactName' headerText='ContactName' width=120></e-column>
              <e-column field='Address' headerText='Address' width=150></e-column>
              <e-column field='Country' headerText='Country' width=150></e-column>
          </e-columns>
      </ejs-grid>
  </div>
</template>

<script setup>
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from "@syncfusion/ej2-vue-grids";
import { customerData } from './datasource';
const data = customerData;
</script>

<style>
 @import "../node_modules/@syncfusion/ej2-vue-grids/styles/material.css";
</style>
```

For further information on creating the Grid component, refer to the detailed getting-started documentation which covers component configuration and styling.

## Creating Test Cases

### Import Required Modules

You need to write the Jest test case in the spec.js extension file. Import the below required modules in your test file:

```javascript
import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
```

The `shallowMount` function from the @vue/test-utils package is used to render the component for Vue testing. To test a specific component, you need to import it into your testing environment.

### Define Test Suite

The `describe` function is utilized to define the test suite. Within the `describe` function, use the `it` function to specify individual test cases:

```javascript
describe('App component', () => {
  it('Length of the record', () => {
  });
});
```

## Snapshot Testing

### About Snapshot Testing

Snapshot testing involves capturing a snapshot of the rendered output of a component and comparing it against a previously stored snapshot. If the current output matches the stored snapshot, the test case will pass successfully. This is useful for detecting unintended changes in component rendering.

### Snapshot Testing Example

In the below example, the `it` block is utilized to define a test case for snapshot testing. Within the test case, the `shallowMount` function from the @vue/test-utils package is used to create a shallow wrapper for the App component. The `expect` statement verifies that the rendered output matches the stored snapshot, utilizing the `toMatchSnapshot` matcher provided by Jest:

```javascript
it('Snapshot testing', () => {
  const wrapper = shallowMount(App);
  expect(wrapper).toMatchSnapshot();
});
```

## DOM Testing

### About DOM Testing

DOM testing involves testing the behavior and interaction of Vue components. The goal is to ensure that the component functions correctly and produces the expected output when interacting with the DOM. You can utilize libraries like @vue/test-utils or @testing-library/vue to manipulate the rendered component in DOM testing.

### DOM Testing Example

The `it` block is used to define a test case. Within the test case, the `shallowMount` function from the @vue/test-utils package is used to create a shallow wrapper for the App component. After creating the wrapper, you need to access the Grid component instance. You check that the Grid's data source has the appropriate number of data records.

The `dataSource` property is employed to retrieve records from the data. By utilizing this property, you can verify the accurate population of data in the Grid component:

```javascript
it('Length of the record', () => {
  const wrapper = shallowMount(App);
  var gridElement = wrapper.find('#Grid');
  const gridInstance = gridElement.vm;
  expect(gridInstance.$props.dataSource).toHaveLength(5);
});
```

### Testing Remote Data

When testing remote data, use the `currentViewData` property instead of the `dataSource` property:

```javascript
it('Remote data length test', () => {
  const wrapper = shallowMount(App);
  var gridElement = wrapper.find('#Grid');
  const gridInstance = gridElement.vm;
  // For remote data, use currentViewData
  expect(gridInstance.$props.currentViewData).toBeDefined();
});
```

**Note:** The `currentViewData` property provides the currently visible records of the Grid, which is useful when working with remote data sources.

## Running Tests

### Execute Jest Test Cases

Run the following command to execute the Jest test case:

```
npm run test
```

This command will run all test files in your project that match the Jest configuration pattern (typically `*.spec.js` or `*.test.js` files).

### Continuous Testing

Jest also supports watching files for changes and re-running tests automatically:

```
npm run test -- --watch
```

### Test Output

After running the tests, Jest will provide a summary of:
- Number of test suites run
- Number of tests passed or failed
- Execution time
- Coverage information (if configured)

## Additional Testing Considerations

### Testing Data Population

Verify that data is correctly populated in the Grid by checking the dataSource array length. This ensures that the Grid receives the expected number of records:

```javascript
expect(gridInstance.$props.dataSource).toHaveLength(expectedLength);
```

### Testing Grid Properties

You can test various Grid properties and configurations to ensure they are correctly applied:

```javascript
expect(gridInstance.$props.height).toBe('315');
expect(gridInstance.$props.allowSorting).toBe(true);
```

### Testing Column Configuration

Verify that columns are correctly configured in the Grid by accessing the columns property through the Grid instance.

### Sample Resources

You can find sample unit Jest testing for DataGrid Vue at the Syncfusion GitHub examples repository, which contains complete working examples for reference and learning purposes.
