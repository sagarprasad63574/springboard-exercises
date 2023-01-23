def calculate(operation, a, b, make_int=False, message='The result is'):
    """Perform operation on a + b, ()possibly truncating) & returning w/msg.

    - operation: 'add', 'subtract', 'multiply', or 'divide'
    - a and b: values to operate on
    - make_int: (optional, defaults to False) if True, truncates to integer
    - message: (optional) message to use (if not provided, use 'The result is')

    Performs math operation (truncating if make_int), then returns as
    "[message] [result]"

        >>> calculate('add', 2.5, 4)
        'The result is 6.5'

        >>> calculate('subtract', 4, 1.5, make_int=True)
        'The result is 2'

        >>> calculate('multiply', 1.5, 2)
        'The result is 3.0'

        >>> calculate('divide', 10, 4, message='I got')
        'I got 2.5'

    If a valid operation isn't provided, return None.

        >>> calculate('foo', 2, 3)
        
    """

    if operation == "add":
        add = a+b
        if make_int == True:
            add = int(add)
        return f"{message} {add}"
    elif operation == "subtract":
        sub = a-b
        if make_int == True:
            sub = int(sub)
        return f"{message} {sub}"
    elif operation == "multiply":
        mult = a*b
        if make_int == True:
            mult = int(mult)
        return f"{message} {mult}"
    elif operation == "divide":
        div = a/b
        if make_int == True:
            div = int(div)
        return f"{message} {div}"
    else:
        return None
