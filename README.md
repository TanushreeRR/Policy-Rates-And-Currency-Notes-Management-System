# RBI-database-to-facilitate-bankers
# Background:

RBI releases the values of policy rates (RR,RRR,CRR,SLR) once in a quarter, based on values of certain factors like GDP, currency exchange rate,etc. But, if the bankers know the values of changed factors in the present quarter, they need not wait till RBI releases the policy rates. The project predicts the new values of policy rates by using multiple linear regression on previous values. This helps the bankers to decide the amount of loan they can deal with, and in many other aspects. The users can also know the previous rate values, and also compare the number of notes of each denomination printed in a given year uisng the values stored in database.  

# Technologies used:
Nodejs, express, mysql, HTML and CSS.

# Steps to run:
Run the XAMPP server in the background, and use the following commands in termianl: "npm init","npm install --save express mysql", "npm install multiple-linear-regression", and "node tables.js". The sql statements written in node js can be executed by running them in web browser using "localhost:3000/createrbipolicies", and so on , "localhost:3000/" being the last execution.
