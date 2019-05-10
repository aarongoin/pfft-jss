
export default function css(...args) {
  const classSet = Object.create(null);
  // iterate over arguments in reverse so we can use the order of insertion preservation
  // properties of the classSet object for deduping classes
  let i = args.length;
  while (i--) {
    const arg = args[i];
    // skip non-string arguments
    if (typeof arg !== "string") continue;
    // split arg into individual classes and eliminate empty strings
    const classes = arg.split(/\s/).filter(Boolean);
    // ignore whitespace-only string args
    if (!classes.length) continue;
    // add each class to the set (eliminates duplicate classes while preserving order)
    let c = classes.length;
    while (c--) classSet[classes[c]] = true;
  }
  // combine classes into single string
  return Object.keys(classSet).reverse().join(' ');
}