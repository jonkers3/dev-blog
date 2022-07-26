---
title: 'React-Native: Getting clipboard data from Android emulator'

tags: ['Workflow Tips']
---

Using the clipboard in react-native is a breeze thanks to `@react-native-clipboard/clipboard`.

But what about accessing that clipboard data on the host OS? We obviously can't just select text on the emulator screen and copy it, so how to get it?

The following adb command does the trick: `adb shell input keyevent 279`. Ensure that the clipboard data on the emulator is set, then run this command. It will get the clipboard value from the emulator and set the host OS clipboard to be the same.

A similar command goes the other direction, setting the emulator clipboard contents: `adb shell input keyevent 278`

### Optional: Add a script to your package.json

```json file=package.json add=2-3 exclude=1,4
"scripts": {
  "receive-clipboard": "adb shell input keyevent 279",
  "send-clipboard": "adb shell input keyevent 278"
}
```

Now `npm run receive-clipboard` and `npm run send-clipboard` will get and set the emulator's clipboard contents.
