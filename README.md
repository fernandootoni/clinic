# Clinic Project

## Login Page
The first page is the login page, where users will access their accounts. As this is a clinic system, only authorized individuals can create accounts. For unsuccessful login attempts, the backend will return 'invalid data' in response to any failed login request.
![Login_page](https://github.com/fernandootoni/clinic/assets/102544229/81b7e655-029e-48ef-abae-bdae4bf2709b)

## Logged Page
Upon successful login, users will have access to specific pages based on their assigned access level. Patients can only view their own appointments. Users, on the other hand, have the capability to browse through all appointments scheduled for the week. They can also mark appointments as completed. Additionally, users can navigate to the "Reports" page, where they will find a comprehensive overview of all appointments along with the corresponding values they are set to receive for the current month.
System administrators will have the authority to view all users, patients, and appointments within the system. They possess the capability to create any of the aforementioned entities and modify them as needed. Additionally, administrators are responsible for validating appointments conducted by users and have the ability to modify them based on the requirements or necessity.
![Logged_page](https://github.com/fernandootoni/clinic/assets/102544229/28d1a237-8639-482b-bc17-0eea94dfeb10)

## Users and Patients
On the "AllUsers" page, administrators have access to all users and patients within the system. They can access individual profiles, update any information, disable user accounts, view the appointments for the week, mark any appointment as completed, and access the "Reports" page. Within the Reports section, administrators can view the comprehensive monthly report of each user.
Moreover, on this page, administrators also have the ability to create new user accounts, register patients, and schedule appointments.
![AllUsers_page](https://github.com/fernandootoni/clinic/assets/102544229/924bcf66-2afa-4291-876f-ee2c869d2479)

## User Dashboard
On the Dashboard page, users can visualize all the appointments scheduled for the upcoming week, displaying their assigned roles such as the attendees (psychologists), and the responsible supervisors.

Within the "Mark Appointment" section, users have the capability to click on a button to mark an appointment as completed. Both the psychologist and the supervisor are required to mark appointments as completed. The system tracks the individual completion of appointments by each role. If a consultation is marked as completed by only one of the assigned roles (psychologist or supervisor), it will affect the monthly balance as the system will not recognize the participation of both parties.

The completion of appointments is a weekly process. This means that a user cannot mark an appointment as completed before it occurs or after it has passed. Any changes or marking of completion for past or upcoming appointments require intervention by the administrator.
![UserDashboard_page](https://github.com/fernandootoni/clinic/assets/102544229/caea3c2a-ba8d-44f6-818b-73ef25338385)

## Patient Dashboard
In the Patient Dashboard, patients or users will be able to view the appointments scheduled for the patients. They can access information about the patient's upcoming appointments and identify the responsible professionals who will be attending to them during those appointments.

![PatientDashboard_page](https://github.com/fernandootoni/clinic/assets/102544229/d7206a88-b4ea-4438-a554-72dc56f8a8a8)

## Perfil
On the user's profile page, we can modify their information, adjust their access level, enable or disable their account, and gain access to their Dashboard and Monthly Report.

Here, we can view all the consultations they are scheduled to conduct as both a psychologist and a supervisor. All pertinent details about these consultations, including the scheduled time and duration, are available for review.
![Perfil_page](https://github.com/fernandootoni/clinic/assets/102544229/22ff28a8-724d-4411-a668-1d3e1bbb5659)

## Report
On the Report page, users have access to all their completed consultations within the month and those pending verification by an administrator. They can see the count of consultations conducted both as a psychologist and as a supervisor, along with comprehensive details about each consultation. This information includes the date of the consultation, its description, the parties involved (attendees and service providers).

The system automatically calculates the user's salary based on the number of completed and verified consultations, considering their hourly rate.
![Report_page](https://github.com/fernandootoni/clinic/assets/102544229/0e291061-2380-4e86-aa16-1b10154e728b)

## Verify
On the Verify page, the administrator has access to all pending consultations awaiting verification, categorized by user. Here, they can review all the details concerning these consultations, including the appointment date, creation timestamp, who marked it as completed, duration, date, and a description for additional context if necessary.
![Verify_page](https://github.com/fernandootoni/clinic/assets/102544229/cf198790-492a-4f41-b190-a1c21d638cf4)

## Create User
On the user creation page, one can input the user's data. However, the email must not be in use by any other user, and the password must be at least 8 characters long, containing at least one uppercase letter, one lowercase letter, one number, and one special character.

If the entered data does not meet these criteria, a notification will appear, informing the user about the errors encountered.
![CreateUser_page](https://github.com/fernandootoni/clinic/assets/102544229/524c61bd-bf9d-4dbf-af1f-f4d4174c785c)

## Update User
![UpdateUser_page](https://github.com/fernandootoni/clinic/assets/102544229/7bbeba1c-bbb9-4524-8ca3-5f6517f49386)

## Create Patient
The patient creation page is straightforward. Simply provide the correct data, and the patient will be created accordingly.
![CreatePatient_page](https://github.com/fernandootoni/clinic/assets/102544229/85cb211e-d4fc-455f-8583-1216af6824cb)

## Create Appointment

The creation of an appointment is more complex, as it requires specifying the attendee, psychologist, and supervisor, along with the appointment's date, hour, minute, and duration.

It's important to note that attempting to schedule an appointment during a time when another appointment is already scheduled will result in an error. This notification will inform the user that the selected time slot is already occupied by another appointment.
![CreateAppointment_page](https://github.com/fernandootoni/clinic/assets/102544229/3e53a8f1-8904-4d14-aa43-b0187a4ae9ed)



