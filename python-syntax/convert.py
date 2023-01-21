def convert_temp(unit_in, unit_out, temp):
    """Convert farenheit <-> celsius and return results.

    - unit_in: either "f" or "c" 
    - unit_out: either "f" or "c"
    - temp: temperature (in f or c, depending on unit_in)

    Return results of conversion, if any.

    If unit_in or unit_out are invalid, return "Invalid unit [UNIT_IN]".

    For example:

      convert_temp("c", "f", 0)  =>  32.0
      convert_temp("f", "c", 212) => 100.0
    """
    # YOUR CODE HERE
    # Fahrenheit to Celsius, subtract 32 and multiply by .5556 (or 5/9).
    # Celsius to Fahrenheit, multiply by 1.8 (or 9/5) and add 32.

    if unit_in == "f":
      if unit_out == "f":
        return temp  
      elif unit_out == "c":
        return round((temp - 32)*0.5556,1)
      else: 
        return (f"Invalid unit {temp}")
    elif unit_in == "c":
      if unit_out == "c":
        return temp
      elif unit_out == "f": 
        return round((temp*1.8)+32,1)
      else: 
        return (f"Invalid unit {temp}")
    else: 
      return (f"Invalid unit {temp}")


print("c", "f", 0, convert_temp("c", "f", 0), "should be 32.0")
print("f", "c", 212, convert_temp("f", "c", 212), "should be 100.0")
print("z", "f", 32, convert_temp("z", "f", 32), "should be Invalid unit z")
print("c", "z", 32, convert_temp("c", "z", 32), "should be Invalid unit z")
print("f", "f", 75.5, convert_temp("f", "f", 75.5), "should be 75.5")

