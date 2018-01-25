# Login flows

New user first launch:

* Opens app and sees intro screen, clicks login Button
* Goes through Auth0 flow and is returned to the app with an accessToken and their profile (add accessToken to AsyncStorage)
* Use the accessToken and their id to get their mongo getMongoProfile (while loading spinner is shown)
* Mongo profile would indicate that onboarding isn't complete so they're shown the Onboarding component
* Once they submit their level it is posted to mongo and their profile is updated in state
* Now mongo indicates onboarding is complete so the Router component renders

Returning user who has logged in, app still in memory

* App uses AppState to accessToken and id in AsyncStorage to get their profile/daily entry
* Router component is shown since they have an accessToken and id in AsyncStorage
