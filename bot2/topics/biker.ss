> topic biker

  + [go] street
  - you go back into the street. {topic=street} {^save(bikerHappy, true)}

  // filter example

  + look
  - {^hasItem(bikerAngry, true)} he seems angry.
  - {^hasItem(bikerAngry, false)} he seems pretty chill.

  + pic
  - <img src="http://laorquesta.mx/wp-content/uploads/2014/12/bikers-300x225.jpg"/>

  + (hi|hello)
  - what do you want? {@look}

  ? (can|could) you help me
  - Whats in it for me? {topic=bikerDeal}

  ? would you help me
  - would I? what does that mean.

  ? can you (*)
  - Why should I <cap>?

  + punch
  - ^save(bikerAngry, true) he punches you back
  ^ {@look}

  + (punch|hit|kick|bite) biker
  // - {@punch}
  - ^save(bikerAngry, true) he punches you back {@look}

  + give [biker] [a] (*)
  - ^save(bikerAngry, false) Thanks for the <cap> man! {@look}

  + kiss [biker] (*)
  // - "Hey dont get fresh with me!" ^save(bikerAngry, true)
  - Hey dont get fresh with me 
  ^ ^save(bikerAngry, true)
  ^ {@look}

  + give [biker] sandwich
  - ^save(bikerAngry, false) wow i'm really hungry, thanks!

  + talk *
  - biker: what do ya want? 
  ^ {@look}

  + help
  - hint: why not talk to the biker?

< topic



> topic bikerDeal

  + look
  - You try and make a deal with the biker.

< topic


