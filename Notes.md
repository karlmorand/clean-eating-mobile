# Login flows

New user first launch:

* Opens app and sees intro screen, clicks login Button
* Goes through Auth0 flow and is returned to the app with an accessToken and their profile (add accessToken to AsyncStorage)
* Use the accessToken and their id to get their mongo getMongoProfile (while loading spinner is shown)
* Mongo profile would indicate that onboarding isn't complete so they're shown the Onboarding component
* Once they submit their level it is posted to mongo and their profile is updated in state
* Now mongo indicates onboarding is complete so the Router component renders

- Login via Auth0 and use accessToken to get Auth0 profile
- use authId and accessToken to getMongoProfile
- !onboardingComplete on mongo profile so show Onboarding
- Once onboarding done show Router passing down accessToken and mongoId so Router can get daily entries
  AsyncStorage: accessToken, mongoId, authId, onboardingComplete

Returning user who has logged in, app still in memory

AppState changes which causes

* App uses AppState to accessToken and id in AsyncStorage to get their profile/daily entry
* Router component is shown since they have an accessToken and id in AsyncStorage

AppState change scenarios...

* App was in memory,
