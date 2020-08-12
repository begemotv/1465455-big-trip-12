export const createDestinationPriceTemplate = (events) => {
  const cityFirst = events[0].city;
  const citySecond = events[1].city;
  const cityLast = events[events.length - 1].city;

  let route;
  if (events.length > 3) {
    route = `${cityFirst} &mdash; ... &mdash; ${cityLast}`
  } else if (events.length === 2) {
    route = `${cityFirst} &mdash; ${citySecond} &mdash; ${cityLast}`
  } else if (events.length === 1) {
    route = `${cityFirst}`
  } else {
    route = `Choose destination`
  }

  let price = 0;
  for (let i = 0; i < events.length; i++) {
    price += events[i].price;
  }

  return (
    `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
           <h1 class="trip-info__title">${route}</h1>
            <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
        </div>
            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
            </p>
     </section>`
  );
};
