# Thread-Evaluator

First and foremost a thank you to [Altreus](http://www.github.com/Altreus) for the original concepts behind this little library.

Thread Evaluator allows for you to pass an object of operations and some data and have it return truthiness.

It supports:
- Greater than (gt)
- Less than (lt)
- Greater than or equal to (gte)
- Less than or equal to (lte)
- Equals (eq)
- Includes (in)
- And (and)
- Or (or)

## Example

```

require('thread-evaluator');

var data = {
  user : {
    name: 'Paul'
  },
  cart : {
    value : 10000
  }
}

var instruction = {
  left : {
    left : {
      model : 'user.name'
    },
    func : 'eq',
    right : {
      value : 'Paul'
    }
  },
  func : 'and',
  right : {
    left : {
      model : 'cart.value'
    },
    func : 'gt',
    right : {
      value : '8000'
    }
  }
}

var result = new Evaluate(instruction, data);

```

Result would be:

```

{
   "state": true,
   "checks": {
      "failed": [],
      "succeeded": [
         "user.name: (Paul) Equals Value: (Paul)",
         "cart.value: (10000) Greater than Value: (8000)",
         "Value: (true) And Value: (true)"
      ]
   }
}

```
