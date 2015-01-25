> topic biker

  + [go] street
  - you go back into the street. {topic=street}

  + look
  - A big biker dude. 
  // filter example
  ^ ^get(bikerAngry) he seems angry. Better check your wallet is safe.
  ^ ^get(bikerAngry) he seems pretty chill. Maybe he knows where we are?

  ? (can|could) you help me
  - Whats in it for me? {topic=bikerDeal}

  ? can you (*)
  - Why should I <cap>?

  + [punch|hit] biker
  - he punches you back ^save(bikerAngry: "true")

  + give *
  - Thanks man! ^save(bikerAngry: "false")


  + talk *
  - {@look}

  + help
  - why not talk to the biker?

< topic

> topic bikerDeal


< topic