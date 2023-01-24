from random import choice

"""Word Finder: finds random words from a dictionary."""

class WordFinder:
    """Finds a random word from a dictionary.
    
    >>> wf = WordFinder("words.txt")
    235886 words read
    """

    def __init__(self, file_path):
        """Read file path and reports number of items read."""

        file = open(file_path, "r")
        self.list = self.parse(file)
        file.close()
        print(f"{len(self.list)} words read")

    def parse(self, file):
        """Parse file -> list of words."""

        return [f.strip() for f in file]

    def random(self):
        """Return random word."""

        print(choice(self.list))


class SpecialWordFinder(WordFinder):
    """Specialized WordFinder that excludes blank lines/comments.

    >>> swf = SpecialWordFinder("words.txt")
    235886 words read
    """

    def __init__(self, file):
        """Calls the WordFinder constructor method"""

        super().__init__(file)

    def parse(self, file):
        """Parse file -> list of words, skipping blanks/comments."""

        return [f.strip() for f in file
                if f.strip() and not f.startswith("#")]
