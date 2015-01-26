> topic backpack

  + look
  - {^hasItem(wrench, true)} you have a wrench
  - {^hasItem(sandwich, true)} a moldy old sandwich
  ^ thats your stuff.

  + get wrench
  - ^save(wrench, true)

  + give wrench to biker
  - ^save(wrench, false) you give the wrench to the biker {topic=bikerHappy}

  + eat sandwich
  - its moldy, but boy are you hungry.
  ^ ^save(hungry, false)
  ^ ^save(sandwich, false)

< topic