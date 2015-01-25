> topic drifter

  + [go] street
  - back out in the street {topic=street} {^save(drifterHappy, true)}

  + (hi|hello|yo)
  - now what the fuck do you want?
  ^ you better not be wasting my time
  ^ what have you got for me? {topic=drifterDeal}

  + look
  - {^hasItem(drifterAngry, true)} you upset the drifter. You should get ready to run.
  - {^hasItem(drifterAngry, false)} its important to have street people happy with you.

  ? (can|could) you help me?
  - Why should I help you? {topic=drifterDeal}

  + help
  - chat with the drifter

< topic


> topic drifterDeal
	
	+ [Can] [I] give [you] [a] (*)
	- ^save(drifterAngry, true) A <cap>! what the hell am I supposed to do with that

	+ give money
	- ^save(drifterAngry, false) Nice! now I'll get something to eat!
	^ what can i help you with
< topic