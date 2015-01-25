> topic biker

  + [go] street
  - you go back into the street. {topic=street}

  // filter example

  + look
  - {^hasItem(bikerAngry)} he seems angry. Better check your wallet is safe.
  - {^hasItem(bikerAngry, false)} he seems pretty chill.

  ? (can|could) you help me
  - Whats in it for me? {topic=bikerDeal}

  ? can you (*)
  - Why should I <cap>?

  + [punch|hit|kick|bite] biker
  - he punches you back ^save(bikerAngry, true)

  + give *
  - Thanks man! ^save(bikerAngry, false)

  + talk *
  - {@look}

  + help
  - why not talk to the biker?

< topic

> topic bikerDeal

  + look
  - You try and make a deal with the biker.

< topic