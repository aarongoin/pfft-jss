/*
# pfft-jss

pfft-jss is a tiny utility library for helping you style your components. All the examples below use React, but pfft-jss is not bound to React, and is really all about class strings.

## How to use or not use:

  1. Use regular css with or without a preprocessor to create *your* style primatives. Use a library like basscss, et. al. that provides these if you like.

  2. Design with your primatives *first*. Ship it! Avoid premature abstractions.
    You *should* always know more tomorrow than today, thus the adage: "premature optimization is the root of all evil".

  3. When you've used the same set of primatives enough together: collect them into a single string variable and use *that* instead.

    const myNewBestStyle = "p1 mb2 fg-primary bg-too-hot-take-it-off";

    const OtherComponent = () => (
      <div className={myNewBestStyle}>
        {oh_noes_camel_case}
      </div>
    )

  4. Profit.

  5. If you'd like: `npm install pfft-jss`.

## API

So what is pfft-jss?
It's a tiny library that contains a single utility function to help you on your journey:

`function css(...any[]): string`

It takes any number of arguments, and returns single string of combined classes from the valid string arguments. The classes are deduped while preserving order, and trimmed of extra whitespace.

Here's some examples of how you could use it:

```javascript

const YourComponent = ({ className, conditionalProp, ...yourProps }) =>
  <DoesntMatter className={css('local-class-names here', conditionalProp && 'conditionalStyle', className)} />;

// Please don't really use it like below. This is merely for demonstration.
const staticStyle = css(' you-smell     like you-smell this-code', false, "      ", { foo: "bar" }, null, 'you-smell');
staticStyle === 'like this-code you-smell';

```

The utility is super simple; So simple in fact that it's included below. Install the package, or copy and paste the code:

```javascript

function css(...args) {
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

```