# License Key Registration

Complete guide for registering Syncfusion license keys in TypeScript applications.

## Table of Contents
- [Overview](#overview)
- [License Registration Methods](#license-registration-methods)
  - [Method 1: Register in Code](#method-1-register-in-code)
  - [Method 2: Register with License File](#method-2-register-with-license-file)
  - [Method 3: Register with Environment Variable](#method-3-register-with-environment-variable)

---

## Overview

A Syncfusion license key must be registered if your project references Syncfusion packages. The license key is a generated string that needs to be registered in your TypeScript application.

> **Note:** Syncfusion license validation is performed **offline** during application execution and does NOT require internet access. Applications registered with a Syncfusion license key can be deployed on any system without an internet connection.

### When License Keys Are Required

License key registration is required from **2022 Vol 1 v20.1.0.47** onwards for Essential JavaScript 2 products.

### How to Generate a License Key

Generate your Syncfusion license key by following the [license key generation guide](https://ej2.syncfusion.com/documentation/licensing/license-key-generation).

---

## License Registration Methods

Three methods to register your Syncfusion license:

1. **Register in code** (js file) - Most common
2. **NPX command with license file** - For build automation
3. **NPX command with environment variable** - For CI/CD

---

### Method 1: Register in Code

Register the license key at the entry point of the project before using the Syncfusion® controls.

```javascript
// Registering Syncfusion license key
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Replace your generated license key here');
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

Remove the `.cache` folder from node modules in the application. Now run the application.
---

