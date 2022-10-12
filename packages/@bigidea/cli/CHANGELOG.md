# @bigidea/cli

## 0.6.4

### Patch Changes

- Do not split output of git ls-files on os-specific newline. Just use \n

## 0.6.3

### Patch Changes

- Another try at fixing behavior on windows, this time for tgz creating during deploy.

## 0.6.2

### Patch Changes

- Try again to fix check for git during create command

## 0.6.1

### Patch Changes

- Fix check for git on windows

## 0.6.0

### Minor Changes

- Let user interactively choose whether they want to create a new account or use an existing on with the login command

## 0.5.2

### Patch Changes

- Don't delete the .git directory during create

## 0.5.1

### Patch Changes

- Added some logging to login --dev mode

## 0.5.0

### Minor Changes

- Deploy to dev or prod env

## 0.4.0

### Minor Changes

- create command no longer requires gh and only creates a local project directory from the template.

## 0.3.0

### Minor Changes

- Converted to typescript

## 0.2.2

### Patch Changes

- Clearer error messages when attempting to create with an existing repo name or directory name

## 0.2.1

### Patch Changes

- Check for `gh` and show actionable error message if it's not installed.

## 0.2.0

### Minor Changes

- Added support for login

Using the following command, user can sign in or sign on using the browser and have their authentication information stored in `.env`.

```shell
npx integration login
```

Note, we will likely move away from using `.env` to more of a configuration file in the near future.

## 0.1.0

### Minor Changes

- Initial version
