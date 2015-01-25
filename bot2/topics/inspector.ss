// ---------   inspector   --------------

> topic inspector

  + askticket
  - wheres your ticket? {topic=ticket}

  + hello
  - dont hello me.

  + * lost
  - "you're lost??! well, that's not my problem."

  ? * ticket
  - "Don't pretend. You know what I'm talking about!"

  // is there an order eg fallthru to last option?
  + huh
  - pay attention! {@askticket}
  - "hey! I'm talking to you!" {@askticket}

< topic

// ------ ticket -----------

> topic ticket includes inspector

  + I lost [*]
  - you lost your ticket? {@getoff}

  + can [you] *
  - What? {@getoff}

  + getoff
  - You have to get off the train then {topic=street}

< topic

