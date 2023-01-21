# For a list of words, print out each word on a separate line, but in all uppercase. 
#How can you change a word to uppercase? Ask Python for help on what you can do with strings! .upper()

# Turn that into a function, print_upper_words. Test it out. 
#(Don’t forget to add a docstring to your function!)

# Change that function so that it only prints words that start with the letter ‘e’ 
#(either upper or lowercase).

# Make your function more general: you should be able to pass in a set of letters, 
#and it only prints words that start with one of those letters.

# For example:

# # this should print "HELLO", "HEY", "YO", and "YES"

# print_upper_words(["hello", "hey", "goodbye", "yo", "yes"],
#                    must_start_with={"h", "y"})

def print_upper_words (words):
    """
        prints each word in the words array to upper case.
    """
    for word in words: 
        print(word.upper())

def print_upper_words2 (words):
    """
        prints each word that starts with lower case e or upper case E in the words array 
        to upper case. 
    """
    for word in words: 
        if word[0] == "e" or  word[0] == "E":
                print(word.upper())

def print_upper_words3 (words, must_start_with):
    """
        prints each words that starts with a give letter {} and converts it to upper case. 
    """
    for word in words:
        for letter in must_start_with:
            if word[0] == letter:
                print(word.upper())
