
import cgi
import os
import urllib

from google.appengine.api import users
from google.appengine.ext import ndb

import jinja2
import webapp2

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

DEFAULT_GUESTBOOK_NAME = ''

# We set a parent key on the 'Greetings' to ensure that they are all in the same
# entity group. Queries across the single entity group will be consistent.
# However, the write rate should be limited to ~1/second.

def phonebook_key(phonebook_name):
    """Constructs a Datastore key for a Contact entity."""
    return ndb.Key('Guestbook', phonebook_name)


class Contact(ndb.Model):
    """Models an individual Contact."""
    name = ndb.StringProperty
    phone = ndb.StringProperty(indexed=False)
    email = ndb.StringProperty(indexed=False)
    date_add = ndb.DateTimeProperty(auto_now_add=True)


class MainPage(webapp2.RequestHandler):
    def get(self):
        if users.get_current_user():
            self.redirect('/profile')

        else:
            url = users.create_login_url(self.request.uri)
            url_linktext = 'Login'
            template_values = {
                'url': url,
                'url_linktext': url_linktext,
            }
            template = JINJA_ENVIRONMENT.get_template('base.html')
            self.response.write(template.render(template_values))


class Profile(webapp2.RequestHandler):
    def get(self):
        if users.get_current_user():
            phonebook_query = Contact.query(
                ancestor=phonebook_key(users.get_current_user().user_id())).order(-Contact.date_add)
            contacts = phonebook_query.fetch(10)
            url = users.create_logout_url(self.request.uri)
            url_linktext = 'Logout'
            template = JINJA_ENVIRONMENT.get_template('profile.html')
            template_values={
                'url':url,
                'url_linktext':url_linktext,
                'contacts':contacts,
            }
            self.response.write(template.render(template_values))

        else:
            self.redirect('/')


application = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/profile', Profile),
], debug=True)
