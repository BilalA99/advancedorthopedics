import { getInsuranceOptions } from "../../lib/insurance-routing";
console.log("label (what the patient sees)".padEnd(34) + "| value (stored / drives PPO priority) | qualification");
console.log("-".repeat(96));
getInsuranceOptions().forEach((o) =>
  console.log(o.label.padEnd(34) + "| " + o.value.padEnd(36) + "| " + o.qualification));
