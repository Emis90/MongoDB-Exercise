1. Create a $test global service on the UI that is available via this.$test. You can look through the front/src/boot folder to see various implementations. This will get you familiar with how to add and call generic JavaScript.
   Question:
   where would this.$test be called? Do you mean callable from the command line or dev tools or from the code itself?
2. Create a test component that does something. Look through front/src/components for how they are implemented. This will get you familiar with the Vue SFC (Single File Component) structure and how to call and include components.
3. Try to create an event responder (search the codebase for "events: {" to see implementations). Fire an event responder by calling "this.$event.emit('yourEventName', yourPayload)".Question:
   Where would this emit command be run (command line, dev tools console, the code itself?
4.  Try to create a command responder (search the codebase for "commands:"). Test your command by pressing "~" to view the command console. Question:
   pressing "~" where? Command line, dev tools console, in the code somewhere?
5.  Try creating a route and test it by creating a page in front/src/router/routes.js and /front/src/pages respectively.

![white_check_mark](https://a.slack-edge.com/production-standard-emoji-assets/10.2/apple-small/2705@2x.png)![eyes](https://a.slack-edge.com/production-standard-emoji-assets/10.2/apple-small/1f440@2x.png)![raised_hands](https://a.slack-edge.com/production-standard-emoji-assets/10.2/apple-small/1f64c@2x.png)

[10:28](https://b2igroup.slack.com/archives/C01AN963GQH/p1599661727000600)

The questions I added and sent back to him

[10:29](https://b2igroup.slack.com/archives/C01AN963GQH/p1599661741001000)

but let me know if you have any more questions

[10:30](https://b2igroup.slack.com/archives/C01AN963GQH/p1599661841003000)

in the meantime, get started on this:

- add each of these 5 as trello tasks
- do one at a time (they should be in not started, one should be in "In progress"
- document your progress

​         screenshots, notes, what you accomplished, we will have a meeting to go over what you've accomplished, but the documentation should serve as a replacement for the meeting as if we didn't need one