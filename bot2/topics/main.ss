// pre runs first to catch any "go" change topic commands

> pre
  + (go|talk to) biker
  - {topic=biker} {@look}

  + (go|talk to) street
  - {topic=street}

  + (go|talk to) drifter
  - {topic=drifter}
< pre


> post 

  + *
  - wildcard here. wassup

< post


+ go start
- You wake up on a train in the middle of nowhere {topic=random}

+ (hi|hello)
- You, wake up! {topic=inspector}

? where am i
- a foreign country. people are talking a language you don't understand.

// ? *
// - why are you asking me?
// - how should I know?


+ [*] (fuck|fucker|shit|damn|shut up|bitch) [*]
- Are you venting your feelings now?
- Are you angry?

+ go * biker
- you see a biker. {topic=biker}

+ go * drifter
- you see a homeless drifter. {topic=drifter}

+ look
- you're lost on a train in the middle of nowhere.

