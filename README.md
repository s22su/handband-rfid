# handband-rfid

This is my first project written in golang, written definitely before 2016-05-27. It is written very badly and you shouldn't write code like this. My excuse was that I was very short in time at that moment. 💩

This repo is my [Hacktoberfest 2018](https://hacktoberfest.digitalocean.com) activity to keep that piece of software somewhere so I won't delete it by accident and to look at the code sometime after 20 years.

# Some history (about project)

Back in the days (2015 or so) my friend visited open air music festival on the beach in Hungary. It was [Balaton Sound](https://en.balatonsound.com/) festival. He saw there an innovative service that we didn't have in Estonia at that time and he decided to do it here.

It was a phone charging booth where employee working in the booth takes customer's phone, charges it and when customer comes back he or she receives the charged phone.

He & his crew tried it in Estonia and did it manually (2015-08-01, Võsu beach festival) - they filled paper with customer's details, personal code (SSN), time when phone was given etc. They charged ~1700 phones that year on [Weekend Festival Baltic](https://www.weekendbaltic.com/) in 2015.

 That was too hard and time consuming. He thought that it would be simpler to have wristbands (I called them handbands back in the days) that can be given to customers when they bring the phones to charge. And also you could use them in cloakroom and luggage storage service by using the same system.

Lifecycle of phone charging would be then something like this:

1. Customer gives phone [(check photo of the "charging booth")](#)
2. Worker uses *handband-rfid* software that saves info in which cell worker puts the phone [(check photo of the "charging station")](#)
3. Person working in the booth connects charger to customer's phone and charges the phone.
4. Customer gets wristband
5. Customer enjoys festival and when he/she feels the need to use the phone comes back to the booth and gives back the wristband
6. Worker uses *handband-rfid* software, scans wristband and gets info in what cell the phone is
7. Worker gets the phone and gives back to customer
8. Customer pays = 🤑 profit!

# Task & tech

I needed to create a piece of software that would record time when phone was given and to which cell it was placed.

RFID reader used was acting like a keyboard - it scanned the wristband, "typed" it to an input field and pressed enter.

Software needed to run on Mac and PC and on that time everyone was speaking about golang and its power to be compiled for each platform. (It was never used on Windows PC as build didn't really work 💩)

#### Technology
- golang (version 1.5 at that time)
- React (ver XXX back in the days)
- Bootstrap (ver XXX)
- sqlite

# Things that never got done

- building for Windows (I built it but couldn't test and it turned out that there was some problem with sqlite)
- multiple events/locations creation and selection
- automatic price calculation
- multiple "products" (for example you could offer cloakroom service in the clubs)
- online sync
- statistics
- employee accounts/worktime logging