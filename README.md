# Garrett Hall and William Keenze

MVP (MAIN GOALS)

1)Routes

As any user when browsing the app, I want to

--Done-- click links/tabs that display different parts of the app.
--Done--see the route I am visiting in the url bar (i.e. Routines tab should have a route https://example.com/routines)
--Done--stay on the "same page", while seeing the content update (i.e. use React Router, no page refresh)
--Done--see Components/Tabs with corresponding routes:
    Home
    Routines
    My Routines
    Activities
    Login/Register (optional. Could be alternatively created as a modal or part of the header/footer)

2)User

As an unregistered visitor I want to:

--Done--see a Sign Up/Sign In form in the header/footer, on a tab (with or without matching route) or in a modal
--Done--be able to sign up for a new account with valid username/password combination
--Done--see meaningful messages if there are errors during registration, so that I may correct them
--Done--see tabbed navigation for Routines and Activities (with matching routes)

As a registered user I want to:

--Done--be able to log in with my username/password combination
--Done--see meaningful messages if there are errors during login, so that I may correct them
--Done--stay logged in between page visits (for example, if I close my browser, and come back later)
--Done--be able to log out if I am logged in
--Done--see tabbed navigation for Routines, My Routines (once logged in), and Activities (with matching routes)

3)Routines

As any user on the Routines tab, I want to:

--Done--see a list of all public routines showing:
--Done--The routine name, goal, and creator's username
--Done--A list of activities for the routine, including their name, description, and duration and/or count

As a registered user on the My Routines tab, I want to:

--Done--be shown a form to create a new routine

    the form should have text fields for name and goal

--for each routine which is owned by me I should
        be able to update the name and goal for the routine
        --done--be able to delete the entire routine
        be able to add an activity to a routine via a small form which has a dropdown for all activities, an inputs for count and duration
        --done--be able to update the duration or count of any activity on the routine
        be able to remove any activity from the routine

4)Activities

As an unregistered visitor on the Activities tab, I want to:

--Done--see a list of all activities which have been created

As a registered user on the Activities tab, I want to:

--Done--be shown a form to create a new activity (by name and description)
--Done--be shown an error if the activity already exists

BONUS--STRETCH GOALS

1)Routines

As any user on the Routines tab, I want to:

--be able to click on a username (shown as a Routine creator), and see a list of all of their public routines
--be able to click on an activity name (shown in a list of activities on a routine), and see a list of all public routines which feature it

As a registered user, on the My Routines tab, I want to:

--expect the dropdown to add an activity to one of my routines not to include any activity which is already a part of the routine

2)Activities

As any user on the Activities tab, I want to:

--Done--be able to click on an activity name and see a list of all public routines which feature it

As a registered user on the Activities tab, I want to:

--Done--be able to edit an existing activity, and update the description, regardless of who owns it