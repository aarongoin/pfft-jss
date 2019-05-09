
export default function css(...args) {
  const classSet = Object.create(null);
  for (const arg of args) {
    // skip non-string arguments
    if (typeof arg !== "string") continue;
    // split arg into individual classes and eliminate empty strings
    const classes = arg.split(' ').filter(Boolean);
    // ignore whitespace-only string args
    if (!classes.length) continue;
    // add each class to the set (eliminates dupe classes while preserving order)
    for (const c of classes) classSet[c] = true;
  }
  // combine classes into single string
  return Object.keys(classSet).join(' ');
}