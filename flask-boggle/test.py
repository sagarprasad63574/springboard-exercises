from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    def setUp(self):
        """Before every test"""

        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_homepage(self):
        """Checks if board is in the session and information is being passed in the index.html page"""

        with self.client:
            response = self.client.get('/')
            self.assertIn('board', session)
            self.assertIsNone(session.get('highscore'))
            self.assertIsNone(session.get('nplays'))
            self.assertIn(b'<p>High Score:', response.data)
            self.assertIn(b'Score:', response.data)
            self.assertIn(b'Seconds Left:', response.data)

    def test_valid_word(self):
        """Checks if a word is valid by modifying the board in the session"""

        with self.client as client:
            with client.session_transaction() as sess:
                sess['board'] = [["D", "O", "G", "D", "D"], 
                                 ["D", "O", "G", "D", "D"], 
                                 ["D", "O", "G", "D", "D"], 
                                 ["D", "O", "G", "D", "D"], 
                                 ["D", "O", "G", "D", "D"]]
        response = self.client.get('/check-word?word=dog')
        self.assertEqual(response.json['result'], 'ok')

    def test_invalid_word(self):
        """Checks if word is in the dictionary"""

        self.client.get('/')
        response = self.client.get('/check-word?word=impossible')
        self.assertEqual(response.json['result'], 'not-on-board')

    def non_english_word(self):
        """Checks if word is on the board"""

        self.client.get('/')
        response = self.client.get(
            '/check-word?word=abcdefghijklmnop')
        self.assertEqual(response.json['result'], 'not-word')

