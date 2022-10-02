# @bigidea/cli

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
