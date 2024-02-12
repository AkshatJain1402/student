import pyrebase
from collections.abc import MutableMapping
config={
    'apiKey': "AIzaSyBAP75W4KsnXxc9s_-d33KOppvK_vsd928",
  'authDomain': "student-bus-boarding.firebaseapp.com",
  'databaseURL': "https://student-bus-boarding-default-rtdb.firebaseio.com",
  'projectId': "student-bus-boarding",
  'storageBucket': "student-bus-boarding.appspot.com",
  'messagingSenderId': "105361929874",
  'appId': "1:105361929874:web:9850481b1649728d16184b",
  'measurementId': "G-K2DGWBK5XY",
}
app=pyrebase.initialize_app(config)
app.storage().child('/studentImages/4975704860782000681520004').put('student\src\Akshat.jpg')