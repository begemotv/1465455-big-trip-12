export const EventOfferTypes = new Map([
  [
    {
      name: `Taxi`,
      icon: `img/icons/taxi.png`,
      placeholder: ` to`,
      type: `transfer`,
    }, [
      {name: `Silent driver`, price: 10, offerClass: `taxi`},
      {name: `Singing driver`, price: 25, offerClass: `taxi`}
    ]
  ],
  [
    {
      name: `Bus`,
      icon: `img/icons/bus.png`,
      placeholder: ` to`,
      type: `transfer`,
    }, []
  ],
  [
    {
      name: `Train`,
      icon: `img/icons/train.png`,
      placeholder: ` to`,
      type: `transfer`,
    }, [
      {name: `Choose seats`, price: 5, offerClass: `upgrade`},
      {name: `Add meal`, price: 15, offerClass: `upgrade`},
      {name: `Switch to first class`, price: 100, offerClass: `upgrade`}
    ]
  ],
  [
    {
      name: `Ship`,
      icon: `img/icons/ship.png`,
      placeholder: ` to`,
      type: `transfer`,
    }, [
      {name: `Choose seats`, price: 5, offerClass: `upgrade`},
      {name: `Add meal`, price: 15, offerClass: `upgrade`},
      {name: `Switch to first class`, price: 100, offerClass: `upgrade`}
    ]
  ],
  [
    {
      name: `Transport`,
      icon: `img/icons/transport.png`,
      placeholder: ` to`,
      type: `transfer`,
    }, []
  ],
  [
    {
      name: `Drive`,
      icon: `img/icons/drive.png`,
      placeholder: ` to`,
      type: `transfer`,
    }, [
      {name: `Buy city guide`, price: 5, offerClass: `sightseeing`}
    ]
  ],
  [
    {
      name: `Flight`,
      icon: `img/icons/flight.png`,
      placeholder: ` to`,
      type: `transfer`,
    }, [
      {name: `Choose seats`, price: 10, offerClass: `upgrade`},
      {name: `Add meal`, price: 15, offerClass: `upgrade`},
      {name: `Switch to first class`, price: 100, offerClass: `upgrade`},
      {name: `Add sport inventory`, price: 50, offerClass: `flight`},
      {name: `Add luggage`, price: 30, offerClass: `flight`}
    ]
  ],
  [
    {
      name: `Check-in`,
      icon: `img/icons/check-in.png`,
      placeholder: ` in`,
      type: `activity`,
    }, []
  ],
  [
    {
      name: `Sightseeing`,
      icon: `img/icons/sightseeing.png`,
      placeholder: ` in`,
      type: `activity`,
    }, [
      {name: `Buy city guide`, price: 5, offerClass: `sightseeing`},
      {name: `Add excursion`, price: 45, offerClass: `sightseeing`}
    ]
  ],
  [
    {
      name: `Restaurant`,
      icon: `img/icons/restaurant.png`,
      placeholder: ` in`,
      type: `activity`,
    }, [
      {name: `Book a table`, price: 5, offerClass: `restaurant`},
      {name: `Buy a rose`, price: 15, offerClass: `restaurant`}
    ]
  ]
]);

export const eventTypes = Array.from(EventOfferTypes.keys());
