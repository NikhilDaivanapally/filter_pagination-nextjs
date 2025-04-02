steps after cloning and before running the app

1. npm install
2. create a .env file in the root folder and add MONGODB_URI
3. uncomment the post_data() and comment the fetch_data() inside of useEffect() and run the application this will insert the data in to the database
4. Now comment the post_data() back to avoid data insertion again in the database and uncomment the fetch_data() inorder to fetch the existing data (inserted data)
5. Now run the application that's it all set
