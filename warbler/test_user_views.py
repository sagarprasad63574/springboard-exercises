"""User View tests."""

import os
from unittest import TestCase

from models import db, connect_db, Message, User, Likes, Follows

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"

from app import app, CURR_USER_KEY

db.create_all()

app.config['WTF_CSRF_ENABLED'] = False


class UserViewTestCase(TestCase):
    """Test views for users."""

    def setUp(self):
        """Create test client, add sample data."""

        db.drop_all()
        db.create_all()

        self.client = app.test_client()

        self.user1 = User.signup("test1", "test1@gmail.com", "password", None)
        self.user1_id = 1111
        self.user1.id = self.user1_id

        self.user2 = User.signup("test2", "test2@gmail.com", "password", None)
        self.user2_id = 2222
        self.user2.id = self.user2_id

        self.user3 = User.signup("jordan", "test3@gmail.com", "password", None)
        self.user3_id = 3333
        self.user3.id = self.user3_id

        self.user4 = User.signup("john", "test4@gmail.com", "password", None)
        self.user5 = User.signup("tim", "test5@gmail.com", "password", None)

        db.session.commit()

    def tearDown(self):
        res = super().tearDown()
        db.session.rollback()
        return res

    def test_users_index(self):
        with self.client as c:
            res = c.get("/users")

            self.assertIn("@test1", str(res.data))
            self.assertIn("@test2", str(res.data))
            self.assertIn("@jordan", str(res.data))
            self.assertIn("@john", str(res.data))
            self.assertIn("@tim", str(res.data))

    def test_users_search(self):
        with self.client as c:
            res = c.get("/users?q=test")

            self.assertIn("@test1", str(res.data))
            self.assertIn("@test2", str(res.data))            

            self.assertNotIn("@jordan", str(res.data))
            self.assertNotIn("@john", str(res.data))
            self.assertNotIn("@tim", str(res.data))

    def test_user_show(self):
        with self.client as c:
            res = c.get(f"/users/{self.user1_id}")

            self.assertEqual(res.status_code, 200)

            self.assertIn("@test1", str(res.data))

    def setup_likes(self):
        m1 = Message(text="Searching on warbler", user_id=self.user1_id)
        m2 = Message(text="Going to the movies", user_id=self.user1_id)
        m3 = Message(id=1234, text="Being bored", user_id=self.user2_id)
        db.session.add_all([m1, m2, m3])
        db.session.commit()

        l1 = Likes(user_id=self.user1_id, message_id=1234)

        db.session.add(l1)
        db.session.commit()

    def test_user_show_with_likes(self):
        self.setup_likes()

        with self.client as c:
            res = c.get(f"/users/{self.user1_id}")

            self.assertEqual(res.status_code, 200)

            self.assertIn("@test1", str(res.data))

    def test_add_like(self):
        m = Message(id=3456, text="Hello world!", user_id=self.user2_id)
        db.session.add(m)
        db.session.commit()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.user1_id

            res = c.post("/users/add_like/3456", follow_redirects=True)
            self.assertEqual(res.status_code, 200)

            likes = Likes.query.filter(Likes.message_id==3456).all()
            self.assertEqual(len(likes), 1)
            self.assertEqual(likes[0].user_id, self.user1_id)

    def test_remove_like(self):
        self.setup_likes()

        m = Message.query.filter(Message.text=="Being bored").one()
        self.assertIsNotNone(m)
        self.assertNotEqual(m.user_id, self.user1_id)

        l = Likes.query.filter(
            Likes.user_id==self.user1_id and Likes.message_id==m.id
        ).one()

        self.assertIsNotNone(l)

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.user1_id

            res = c.post(f"/users/add_like/{m.id}", follow_redirects=True)
            self.assertEqual(res.status_code, 200)

            likes = Likes.query.filter(Likes.message_id==m.id).all()
            self.assertEqual(len(likes), 0)

    def test_unauthenticated_like(self):
        self.setup_likes()

        m = Message.query.filter(Message.text=="Being bored").one()
        self.assertIsNotNone(m)

        like_count = Likes.query.count()

        with self.client as c:
            res = c.post(f"/users/add_like/{m.id}", follow_redirects=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn("Access unauthorized", str(res.data))
            self.assertEqual(like_count, Likes.query.count())

    def setup_followers(self):
        f1 = Follows(user_being_followed_id=self.user2_id, user_following_id=self.user1_id)
        f2 = Follows(user_being_followed_id=self.user3_id, user_following_id=self.user1_id)
        f3 = Follows(user_being_followed_id=self.user1_id, user_following_id=self.user2_id)

        db.session.add_all([f1,f2,f3])
        db.session.commit()

    def test_user_show_with_follows(self):

        self.setup_followers()

        with self.client as c:
            res = c.get(f"/users/{self.user1_id}")

            self.assertEqual(res.status_code, 200)

            self.assertIn("@test1", str(res.data))

    def test_show_following(self):

        self.setup_followers()
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.user1_id

            res = c.get(f"/users/{self.user1_id}/following")
            self.assertEqual(res.status_code, 200)
            self.assertIn("@test2", str(res.data))
            self.assertIn("@jordan", str(res.data))
            self.assertNotIn("@john", str(res.data))
            self.assertNotIn("@tim", str(res.data))

    def test_show_followers(self):

        self.setup_followers()
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.user1_id

            res = c.get(f"/users/{self.user1_id}/followers")

            self.assertIn("@test2", str(res.data))
            self.assertNotIn("@jordan", str(res.data))
            self.assertNotIn("@john", str(res.data))
            self.assertNotIn("@tim", str(res.data))

    def test_unauthorized_following_page_access(self):
        self.setup_followers()
        with self.client as c:

            res = c.get(f"/users/{self.user1_id}/following", follow_redirects=True)
            self.assertEqual(res.status_code, 200)
            self.assertNotIn("@test2", str(res.data))
            self.assertIn("Access unauthorized", str(res.data))

    def test_unauthorized_followers_page_access(self):
        self.setup_followers()
        with self.client as c:

            res = c.get(f"/users/{self.user1_id}/followers", follow_redirects=True)
            self.assertEqual(res.status_code, 200)
            self.assertNotIn("@test2", str(res.data))
            self.assertIn("Access unauthorized", str(res.data))