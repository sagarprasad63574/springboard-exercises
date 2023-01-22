def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """
    flip_phrase = ""

    for char in phrase: 
        if (char.lower() == to_swap.lower()):
            char = char.swapcase()
        flip_phrase += char
        
    return flip_phrase
