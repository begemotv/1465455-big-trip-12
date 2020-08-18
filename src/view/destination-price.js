const generateDate = (startDate, endDate) => {
  const monthNames = [`JAN`, `FEB`, `MAR`, `APR`, `MAY`, `JUN`,
    `JUL`, `AUG`, `SEP`, `OCT`, `NOV`, `DEC`];
  let startDay = startDate.getDate();
  let month = monthNames[startDate.getMonth()];
  let endDay = endDate.getDate();

  return `${month} ${startDay}&nbsp;&mdash;&nbsp;${endDay}`;
};

export const createDestinationPriceTemplate = (events, dates) => {
  const {startDate, endDate} = dates;
  const dateInterval = generateDate(startDate, endDate);
  const cityFirst = events[0].city;
  const citySecond = events[1].city;
  const cityLast = events[events.length - 1].city;

  let route;
  if (events.length > 3) {
    route = `${cityFirst} &mdash; ... &mdash; ${cityLast}`;
  } else if (events.length === 2) {
    route = `${cityFirst} &mdash; ${citySecond} &mdash; ${cityLast}`;
  } else if (events.length === 1) {
    route = `${cityFirst}`;
  } else {
    route = `Choose destination`;
  }

  let priceEvents = 0;
  for (let i = 0; i < events.length; i++) {
    priceEvents += events[i].price;
  }

  let priceOffers = 0;
  for (let i = 0; i < events.length; i++) {
    priceOffers += events[i].offersPrice;
  }

  const price = priceEvents + priceOffers;

  return (
    `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
           <h1 class="trip-info__title">${route}</h1>
            <p class="trip-info__dates">${dateInterval}</p>
        </div>
            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
            </p>
     </section>`
  );
};
