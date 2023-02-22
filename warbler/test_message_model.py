"""Message model tests."""

import os
from unittest import TestCase
from sqlalchemy import exc

from models import db, User, Message, Follows, Likes

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"

from app import app

db.create_all()


class UserModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""
        db.drop_all()
        db.create_all()

        testuser = User.signup("testing", "testing@test.com", "password", None)
        self.testuser_id = 1234

        testuser.id = self.testuser_id
        db.session.commit()

        self.testuser = User.query.get(self.testuser_id)

        self.client = app.test_client()

    def tearDown(self):
        res = super().tearDown()
        db.session.rollback()
        return res

    def test_message_model(self):
        
        m = Message(
            text="Test message",
            user_id=self.testuser_id
        )

        db.session.add(m)
        db.session.commit()

        self.assertEqual(len(self.testuser.messages), 1)
        self.assertEqual(self.testuser.messages[0].text, "Test message")

    def test_message_likes(self):
        m1 = Message(
            text="Test message",
            user_id=self.testuser_id
        )

        m2 = Message(
            text="Test message 2",
            user_id=self.testuser_id 
        )

        user = User.signup("test2", "test2@gmail.com", "password", None)
        user_id = 1111
        user.id = user_id
        db.session.add_all([m1, m2, user])
        db.session.commit()

        user.likes.append(m1)

        db.session.commit()

        l = Likes.query.filter(Likes.user_id == user_id).all()
        self.assertEqual(len(l), 1)
        self.assertEqual(l[0].message_id, m1.id)


        