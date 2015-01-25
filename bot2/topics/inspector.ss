// ---------   inspector   --------------

> topic inspector

  + look
  - the ticket inspector is looking grumpy. He might fine you.

  + hello
  - dont hello me. {@askticket}

  + [i am] lost
  - you're lost??! well, that's not my problem.

  + * [lost] * ticket
  - Don't pretend. You know what I'm talking about!

  // is there an order eg fallthru to last option?
  + huh
  - pay attention! {@askticket}
  - "hey! I'm talking to you!" {@askticket}

  + askticket
  - wheres your ticket? {topic=ticket}

< topic

> post 

  + *
  - wildcard here. wassup

< post

// ------ ticket -----------

> topic ticket includes inspector

  + I lost [*]
  - you lost your ticket? {@getoff}

  ? can [you] *
  - What? {@getoff}

  + getoff
  - You have to get off the train then {topic=street}

< topic

