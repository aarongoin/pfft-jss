# pfft-jss

pfft-jss is a tiny utility library for helping you style your components. All the examples below use React, but pfft-jss is not bound to React, and is really all about class strings.

## How to use (or not use):

  1. Use regular css with or without a preprocessor to create *your* style primatives. Use a library like basscss, et. al. that provides these if you like.

  2. Design with your primatives *first*. Ship it! Avoid premature abstractions.
    You *should* always know more tomorrow than today, thus the adage: "premature optimization is the root of all evil".

  3. When you've used the same set of primatives enough together: collect them into a single string variable and use *that* instead.

  ```javascript

  const myNewBestStyle = "p1 mb2 fg-primary bg-too-hot-take-it-off";

  const OtherComponent = () => (
    <div className={myNewBestStyle}>
      {oh_noes_camel_case}
    </div>
  )

  ```

  4. Avoid abstracting your components simply to encapsulate styles. Prefer instead to bundle your classes as shown above and export them--at least until your styles are so battle-hardened that you can formailze them with explicit classes.

  5. If you'd like to:
  
  ```javascript
  npm install pfft-jss
  ```

# API

So what is pfft-jss?
It's a tiny library that contains a single utility function to help you on your journey:

```javascript
function css(...any[]): string
```

It takes any number of arguments, and returns single string of combined classes from the valid string arguments. The classes are deduped while preserving order, and trimmed of extra whitespace.

Here's some examples of how you could use it:

```javascript

const YourComponent = ({ className, conditionalProp, ...yourProps }) =>
  <DoesntMatter
    className={css('local-class-names here', conditionalProp && 'conditionalStyle', className)}
  />;

// Please don't really use it like below. This is to demonstrate it's behavior.
const staticStyle = css(' you-smell     like you-smell this-code', false, "      ", { foo: "bar" }, null, 'you-smell');
staticStyle === 'like this-code you-smell';

```

The utility is super simple. So simple in fact that it's included below. Install the package, or copy and paste the code:

```javascript

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
  // combine classes into single string (reversing keys to keep correct order of application of unique classes)
  return Object.keys(classSet).reverse().join(' ');
}

```

# How to Contribute

Open an issue in github, or a pull request. Reach out and poke someone. Let's make it happen. Bloat not welcome.

# License

ISC