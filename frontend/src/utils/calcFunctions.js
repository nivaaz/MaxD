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

export function allocatePhases(data) {
  let Phases = [3]; /*check if this is 0-3 or 0-2 */
  let newData = data.sort(data.current); //sort data by current.
  
  for (let i = 0; i < data.length; i ++ ){
    if (i%2){     /* if even  */
    Phases[0].push(newData[i])
    Phases[1].push(newData[i+1])
    Phases[2].push(newData[i+2])
    
    } else {  /* if odd*/
      Phases[0].push(newData[i+2])
      Phases[1].push(newData[i+1])
      Phases[2].push(newData[i])
    }
  }
  return Phases;
}
// with shift algo
export function allocatePhasesCircular(data) {
  let Phases = [3]; /*check if this is 0-3 or 0-2 */
  let newData = data.sort(data.current); //sort data by current.
  let x = [0, 1, 2];
  for (let i = 0; i < data.length; i=i+3 ){
    Phases[x[0]].push(newData[i])
    Phases[x[1]].push(newData[i+1])
    Phases[x[2]].push(newData[i+2])
  x = circshift(x)   
  }
  return Phases;
}

function circshift(ar){
  let newArr = ar;
  newArr[0] =ar[ar.length];  //first = end 
  for (let i = 1; i < ar.length; i ++){
    newArr[i] = ar[i+1]
  }
}

export function sumPhase(Phase){
  let sum = 0;
  for(let i = 0 ; i<Phase.length; i ++){
    sum= sum + (Phase[i].current);
  }
  return sum;
}