const { v4: uuidv4 } = require('uuid');

const users = [];
const activeRooms = []

const userMatchingAlgorithm = (uid, mood) => {
    console.log("USERS: ", users)
    let randomVal = Math.floor((Math.random() * users.length))

    let randomUser = users[randomVal == -1 ? 0 : randomVal]

    console.log(`Random User: ${randomUser}\nRandom Val: [${randomVal}]`)


    // if mathched with same user
    if (randomUser.id == uid) {
        // 45% chance of being alone; 55% chance of being matched with someone else
        let random = Math.floor(Math.random() * 100)
        if (random < 45 && users.length > 1) {
            randomUser.room = uuidv4()
            return randomUser
        }
        return userMatchingAlgorithm(uid, mood)

    }


    // if matched with user with room
    if (randomUser.room != null) {
        // check if room has 2 users
        let roomCount = 0
        users.map((user) => {
            if (user.room == randomUser.room) {
                roomCount++
            }
        })
        if (roomCount == 2) {
            return userMatchingAlgorithm(uid, mood)
        }

    }

    if (mood == "sad" && randomUser.mood == "depressed") {
        return userMatchingAlgorithm(uid, mood);
    }
    else if (mood == "depressed" && randomUser.mood == "sad") {
        return userMatchingAlgorithm(uid, mood);
    }
    else if (mood == "depressed" && randomUser.mood == "depressed") {
        return userMatchingAlgorithm(uid, mood);
    }
    console.log("Random User" + JSON.stringify(randomUser))
    return randomUser
}


const addUser = ({ id, name, mood }) => {
    console.log("addUser function => ", id, name, mood)
    name = name.trim().toLowerCase();
    mood = mood.trim().toLowerCase();

    if (!name || !mood) return { error: 'Username and Mood are required.' };

    const user = { id, name, mood, room: null };
    users.push(user);

    let room_to_join = users.length == 1 ? uuidv4() : userMatchingAlgorithm(id, mood).room

    user.room = room_to_join

    // find user in users array and update room
    users.map((user) => {
        if (user.id == id) {
            user.room = room_to_join
        }
    })


    activeRooms.push(room_to_join)

    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };