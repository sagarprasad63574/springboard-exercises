"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start):
        "Creates a serial number initialized to a starting number, count and stores the initial count"
        
        self.initial_count = start-1
        self.count = start-1
    
    def __repr__(self):
        """Show representation."""

        return f"<SerialGenerator start={self.initial_count+1} next={self.count+1}>"

    def generate(self): 
        "Increments count by 1 and returns count"
        
        self.count += 1
        return self.count
    
    def reset(self):
        "Resets the count variable to the initial count variable"
        
        self.count = self.initial_count

