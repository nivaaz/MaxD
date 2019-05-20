/* CALCULATION FUNCTIONS */
export function getCurrent(voltage, wattage, diversity, pf){
  console.log("get current")
  const c = wattage/voltage;
  if (diversity){
    c = c/diversity;
  }
  if (pf){
    c = c/pf;
  }
}

export function getWattage(voltage, current, diversity, pf){
  console.log("get wattage")
  const w = voltage * current;
  if(diversity){
    w = w*diversity
  }
  if (pf){
    w = w*pf
  }
  return ;
}

/* CHECK DATA FUNCTIONS */
/* returns errors for  */
export function checkAll(voltage, current, diversity, pf){
  let errors = [];
  if (voltage < 0 ){
    errors = errors.push([0, "v"]);  
  }
  if (current < 0 ){
    errors = errors.push( [0, "c"]);  
  }
  if (diversity < 0 ){
    errors = errors.push( [0, "d"]);  
  }
  if (pf < 0 ){
    errors = errors.push( [0, "pf"]);  
  }
  return errors;
}