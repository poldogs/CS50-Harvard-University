-- Query 1: Check the crime scene reports for incidents on July 28, 2021, on Humphrey Street.
SELECT *
FROM crime_scene_reports
WHERE day = 28 AND month = 7 AND year = 2021 AND street = 'Humphrey Street';

-- Query 2: Look for interviews related to the theft incident.
SELECT *
FROM interviews
WHERE day = 28 AND month = 7 AND year = 2021;

-- Query 3: Investigate Ruth's information about the thief getting into a car.
SELECT *
FROM bakery_security_logs
WHERE hour = 10 AND day = 28 AND month = 7 AND year = 2021 AND activity = 'exit';

-- Query 4: Investigate Eugene's information about the thief withdrawing money.
SELECT *
FROM atm_transactions
WHERE day = 28 AND month = 7 AND year = 2021 AND atm_location = 'Leggett Street' AND transaction_type = 'withdraw';

-- Query 5: Investigate Raymond's information about the thief planning to take the earliest flight.
SELECT *
FROM flights
WHERE day = 29 AND month = 7 AND year = 2021;

-- Query 6: Investigate Raymond's information about the thief's phone call.
SELECT *
FROM phone_calls
WHERE day = 28 AND month = 7 AND year = 2021 AND duration < 60;

-- Query 7: Take a look at airports with id 4, so we get the destination of the flight.
SELECT *
FROM airports
WHERE id = 4;

-- Query 8: Take a look at passengers of the flight_id 36.
SELECT *
FROM passengers
WHERE flight_id = 36;

-- Query 9: Take a look at bank_accounts numbers.
SELECT person_id
FROM bank_accounts
WHERE account_number IN (28500762, 28296815, 76054385, 49610011, 16153065, 25506511, 81061156, 26013199);

-- Query 10: Take a look at people with specific passport_numbers, phone_numbers, and IDs.
SELECT *
FROM people
WHERE passport_number IN (7214083635, 1695452385, 5773159633, 1540955065, 8294398571, 1988161715, 9878712108, 8496433585)
   AND phone_number IN ('(130) 555-0289', '(996) 555-8899', '(499) 555-9472', '(892) 555-8872', '(367) 555-5533', '(375) 555-8161', '(609) 555-5876', '(389) 555-5198', '(499) 555-9472', '(717) 555-1342', '(286) 555-6063', '(676) 555-6554', '(770) 555-1861', '(725) 555-3243', '(031) 555-6622', '(910) 555-3251', '(826) 555-1652', '(066) 555-9701', '(338) 555-6650', '(704) 555-2131')
   AND id IN (686048, 514354, 458378, 395717, 396669, 467400, 449774, 438727);

-- Query 11: Take a look at people with specific IDs and license plates.
SELECT *
FROM people
WHERE id IN (395717, 449774, 467400, 686048)
   AND license_plate IN ('5P2BI95', '94KL13X', '6P58WS2', '4328GD8', 'G412CB7', 'L93JTIZ', '322W7JE', '0NTHK55', '1106N58');

-- Query 12: Getting the call between thief and accomplice.
SELECT *
FROM phone_calls
WHERE day = 28 AND month = 7 AND year = 2021 AND duration < 60
   AND caller IN ('(286) 555-6063', '(389) 555-5198', '(367) 555-5533');

-- Query 13: Getting the possible thiefs (callers).
SELECT *
FROM people
WHERE phone_number IN ('(367) 555-5533', '(286) 555-6063');

-- Query 14: Getting the possible accomplices (receivers).
SELECT *
FROM people
WHERE phone_number IN ('(375) 555-8161', '(676) 555-6554');