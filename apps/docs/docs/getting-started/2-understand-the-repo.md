# Step 2 - Understand the Repo

Open up the `my-integrations` repo with your IDE and familiarize yourself with the key files in the directory structure.

    .
    ├── ...
    ├── src
    │   ├── index.js
    │   └── tasks
    │       ├── githubPushToSlack.js
    │       ├── helloToSlack.js
    │       ├── helloWorld.js
    │       ├── webhookToSlack.js
    └── ...

If you take a look at `src/index.js`, you can see each of the files in task is referenced, but most are commented out.

```typescript
import "./tasks/helloWorld";
// import "./tasks/helloToSlack";
// import "./tasks/webhookToSlack";
// import "./tasks/githubPushToSlack";
```

Since `helloWorld` is the only one linked, it will be the only task deployed for now.