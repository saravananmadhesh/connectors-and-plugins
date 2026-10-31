# License Key Registration

Complete guide for registering Syncfusion license keys in Vue applications.

## Table of Contents
- [Overview](#overview)
- [Registration Methods](#registration-methods)
  - [Method 1: Register in Code](#method-1-register-in-code)
  - [Method 2: Register with License File](#method-2-register-with-license-file)
  - [Method 3: Register with Environment Variable](#method-3-register-with-environment-variable)
- [CI/CD License Registration](#cicd-license-registration)
  - [GitHub Actions](#github-actions)
  - [Azure Pipelines (YAML)](#azure-pipelines-yaml)
  - [Azure Pipelines (Classic)](#azure-pipelines-classic)
- [Troubleshooting](#troubleshooting)

---

## Overview

A Syncfusion license key must be registered if your project references Syncfusion Vue packages. The license key is a generated string that needs to be registered in your Vue application.

> **Note:** Syncfusion license validation is performed **offline** during application execution and does NOT require internet access. Applications registered with a Syncfusion license key can be deployed on any system without an internet connection.

### When License Keys Are Required

License key registration is required from **2022 Vol 1 v20.1.0.47** onwards for Essential JavaScript 2 products.

### How to Generate a License Key

Generate your Syncfusion license key by following the [license key generation guide](https://ej2.syncfusion.com/vue/documentation/licensing/license-key-generation).

---

## License Registration Methods

Three methods to register your Syncfusion license:

1. **Register in code** (main.js or App.vue) - Most common
2. **NPX command with license file** - For build automation
3. **NPX command with environment variable** - For CI/CD

---

### Method 1: Register in Code

Register the license key before creating the Vue app.

**For Vue 3 Projects:**

```javascript
// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import { registerLicense } from '@syncfusion/ej2-base';

// Register Syncfusion license key
registerLicense('YOUR_LICENSE_KEY_HERE');

createApp(App).mount('#app');
```

**For Nuxt 3 Projects:**

```vue
<!-- app.vue -->
<script>
import { registerLicense } from '@syncfusion/ej2-base';

// Register Syncfusion license key
registerLicense('YOUR_LICENSE_KEY_HERE');
</script>
```

---

### Method 2: Register with License File

The following steps show how to register the Syncfusion license key with the license text file.

#### Step 1: Create License File

Create the `syncfusion-license.txt` file in the application root directory and paste the license key.

#### Step 2: Activate License

Open the command prompt in the application root directory and activate the license key using the following command:

```bash
npx syncfusion-license activate
```

#### Step 3: Verify Activation

Once the Syncfusion license key is activated, the following console message will appear:

```
(INFO) Syncfusion License imported successfully.
```

#### Step 4: Clean Cache

Remove the `.cache` folder from `node_modules` in the application.

#### Step 5: Run Application

Run the application. If you encounter a license validation error, refer to the [licensing errors documentation](https://ej2.syncfusion.com/vue/documentation/licensing/licensing-errors). For frequently asked license registration questions, refer to the [licensing troubleshoot guide](https://ej2.syncfusion.com/vue/documentation/licensing/licensing-troubleshoot).

> **Note:** If you don't want to use the license text file in the application, refer to [Method 3](#method-3-register-with-environment-variable) to use an environment variable and register the Syncfusion license key.



### Method 3: Register with Environment Variable

Set the environment variable `SYNCFUSION_LICENSE` in the system with the license key as the value. This can be used across all applications on your machine.

> **Priority:** If both the license text file and the environment variable are used for license registration, priority is given to the `syncfusion-license.txt` file. To use the environment variable for license registration, remove the license text file from the application.

#### Windows

Open the command prompt and use the `setx` command to add the new environment variable:

```bash
setx SYNCFUSION_LICENSE "license key"
```

> **Important:** Restart the terminal or IDE after setting the environment variable for changes to take effect.

#### macOS

**View existing variables:**

```bash
env
```

**Set the environment variable:**

```bash
echo 'export SYNCFUSION_LICENSE="license key"' >> ~/.bash_profile
```

**Modify the environment variable:**

If you want to modify the environment variable in the bash profile, use the below command:

```bash
nano .bash_profile
```

Once modified the variable:
1. Press `ctrl+x` to exit
2. Press `Y` to confirm
3. Press `Enter` to save the changes

Close the terminal and open it again to see the environment variables changes using `env` command.

#### Linux

**View existing variables:**

```bash
env
```

**Set or modify the environment variable:**

```bash
export SYNCFUSION_LICENSE='license key'
```

#### Activate License

Once the `SYNCFUSION_LICENSE` environment variable is set, restart the IDE or application terminal before using the license activation command.

Open the command prompt in the application root directory and activate the license key by using the below command:

```bash
npx syncfusion-license activate
```

Once the Syncfusion license key is activated, the following console message will appear:

```
(INFO) Syncfusion License imported successfully.
```

Remove the `.cache` folder from node modules in the application.

Now run the application. If you are facing a license validation error, refer to the [licensing errors documentation](https://ej2.syncfusion.com/vue/documentation/licensing/licensing-errors). Also, find the most frequent license registration questions from the [licensing troubleshoot guide](https://ej2.syncfusion.com/vue/documentation/licensing/licensing-troubleshoot).

---

## CI/CD License Registration

The following sections show how to use an environment variable in CI services.

### GitHub Actions

Create a [new Repository Secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) or an [Organization Secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-an-organization). Set the name of the secret to `SYNCFUSION_LICENSE` and use the license key as a value.

Add the Syncfusion license activation command after running npm install or yarn:

```yaml
steps:
- name: Install node modules
  run: npm install

- name: Activate Syncfusion License
  run: npx syncfusion-license activate
  env:
    SYNCFUSION_LICENSE: ${{ secrets.SYNCFUSION_LICENSE }}
```

### Azure Pipelines (YAML)

Create a new [User-defined Variable](https://docs.microsoft.com/en-us/azure/devops/pipelines/process/variables?view=azure-devops&tabs=yaml%2Cbatch) named `SYNCFUSION_LICENSE`. Use the license key as a value.

Add the Syncfusion license activation command after running npm install or yarn.

#### Windows Build Agents

The following example shows the syntax for Windows build agents:

```yaml
pool:
  vmImage: 'windows-latest'

steps:
- script: call npm install
  displayName: 'Install node modules'

- script: call npx syncfusion-license activate
  displayName: 'Activate Syncfusion License'
  env:
    SYNCFUSION_LICENSE: $(SYNCFUSION_LICENSE)
```

#### Linux Build Agents

The following example shows the syntax for Linux build agents:

```yaml
pool:
  vmImage: 'ubuntu-latest'

steps:
- script: npm install
  displayName: 'Install node modules'

- script: npx syncfusion-license activate
  displayName: 'Activate Syncfusion License'
  env:
    SYNCFUSION_LICENSE: $(SYNCFUSION_LICENSE)
```

### Azure Pipelines (Classic)

Create a new [User-defined Variable](https://docs.microsoft.com/en-us/azure/devops/pipelines/process/variables?view=azure-devops&tabs=yaml%2Cbatch) named `SYNCFUSION_LICENSE`. Use the license key as a value.

Add a Bash task to run the Syncfusion license activation command after running npm install or yarn:

```bash
npx syncfusion-license activate
```

---
