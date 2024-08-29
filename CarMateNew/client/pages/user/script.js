function showServiceDetails(idx) {
  renderer.renderServiceDetails({ idx, ...apiManager.data[idx] });
}

function addService(idx) {
  renderer.renderAddService({
    idx,
    days: getAvailableDays(),
    hours: getAvailableHours(),
    discount: 6.5,
    ...apiManager.data[idx],
  });
}

function getAvailableDays() {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date();
  const dayIdx = date.getDay();
  const day = date.getUTCDate();
  const month = months[date.getMonth()];
  return {
    Today: `${day} ${month}`,
    Tomorrow: `${day + 1} ${month}`,
    [`${weekDays[dayIdx + 2]}`]: `${day + 2} ${month}`,
    [`${weekDays[dayIdx + 3]}`]: `${day + 3} ${month}`,
  };
}

function getAvailableHours() {
  return {
    hSlot1: "8:00 - 9:00",
    hSlot2: "9:00 - 10:00",
    hSlot3: "10:00 - 11:00",
    hSlot4: "11:00 - 12:00",
    hSlot5: "12:00 - 13:00",
    hSlot6: "13:00 - 14:00",
  };
}

function addServiceToCart(event) {
  event.preventDefault();
  console.log($("form").serializeArray());
}
