# sama_app

### Installation
1) npm install
2) npm run install-all
3) npm run app

Since I was just using Express and Mongo/Mongoose for the backend, and not a 'true' MVC framework (the client-side React code would be the 'view' I suppose), I decided to simply separate that app into two main folders: client and server.

### Trade-Offs

Seeing this was a quick proof-of-concept style of app, I decided to focus on the basic CRUD functionality of the forms and boxes first. Future work would be needed on the positioning of boxes, as well as a much deeper dive into design and UI/UX.

Features: 
1) Select either Form 
2) Select from saved forms 
3) Create new form, give it a name, and save
4) On selected forms, user can delete form and be redirected back to select form page
5) User can click button to toggle a "Box creation" mode
6) Users can save boxes
7) Ussers can delete boxes (I had to user location.reload instead of trying to update state since I'm running out of time!)

Next Steps:
1) Box width/height
2) Overall design/color
3) Associations in the backend to populate on the proper boxes with corresponding forms


### Most Proud

I felt most proud of setting up the API and utilization of React Router features to cut down on 'prop-drilling'.
