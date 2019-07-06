/* CALCULATION FUNCTIONS */
export function getCurrent(voltage, wattage, diversity, pf) {
  console.log(
    "get current " + voltage + " " + wattage + " " + diversity + " " + pf
  );
  var c = wattage / voltage;
  console.log(c.toFixed(2));
  if (diversity) {
    c = c / diversity;
    console.log(c.toFixed(2));
  }
  if (pf) {
    c = c / pf;
    console.log(c.toFixed(2));
  }
  return c.toFixed(2);
}

export function getWattage(voltage, current, diversity, pf) {
  console.log(
    "get wattage " + voltage + " " + current + " " + diversity + " " + pf
  );
  var w = voltage * current;
  console.log(w.toFixed(2));
  if (diversity) {
    w = w * diversity;
    console.log(w.toFixed(2));
  }
  if (pf) {
    w = w * pf;
    console.log(w.toFixed(2));
  }
  return w.toFixed(2);
}

/* CHECK DATA FUNCTIONS */
/* returns errors for  */
export function checkAll(voltage, current, diversity, pf) {
  let errors = [];
  if (voltage < 0) {
    errors = errors.push([0, "v"]);
  }
  if (current < 0) {
    errors = errors.push([0, "c"]);
  }
  if (diversity < 0) {
    errors = errors.push([0, "d"]);
  }
  if (pf < 0) {
    errors = errors.push([0, "pf"]);
  }
  return errors;
}

export function range (start, end){
  const a = [];
  for (var i=start; i<(end-start); i++){
    a.push(i)
  }
  return a
}
