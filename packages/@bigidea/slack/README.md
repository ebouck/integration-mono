# Slack Connector

## Examples

### Create an auth

```typescript
const slackAuth = Slack.defineAuth({ name: 'slack' })
```

### Use in a task

```typescript
defineTask({
  name: 'helloSlack',
  auths: {
    slack: slackAuth,
  },
  run: async ({ auths }) => {
    const slack = new Slack({ auth: auths.slack });
    await slack.postMessage({ channel: '#general', text: 'Hello Slack'})
  }
})
```
