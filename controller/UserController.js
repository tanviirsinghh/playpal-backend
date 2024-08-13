const UserModel = require("../model/user")
const reply = require("../helper/reply")
const Lang = require("../language/en")
const { CoursesModel } = require("../model/courses")
const { GoalsModel } = require("../model/goals")
const { CollegeModel } = require("../model/college")
const { CountryModel } = require("../model/country")
const { TournamentModel } = require("../model/tournament")
const { TeamModel } = require("../model/team")
const { StateModel } = require("../model/state")
const { CityModel } = require("../model/city")
const { FriendModel } = require("../model/useFriends")
const { ProductModel } = require("../model/product")
const { AddTeamMemberModel } = require("../model/addTeamMember")
const { MessageModel } = require("../model/messages")


const getProfile = async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.user._id }).select(['email', 'userName', 'createdAt', 'address', 'phoneNumber', 'team'])
        if (!user) {
            return res.status(402).json(reply.failure("User not exist "));
        }
        return res.status(200).json(reply.success("get profile", user))

    } catch (err) {
        return res.status(402).json(reply.failure(err.message))
    }
}
const getUserId = async (req, res) => {
    try {
        const session_id = req.user._id
        return res.status(200).json(reply.success("get profile", session_id))

    } catch (err) {
        return res.status(402).json(reply.failure(err.message))
    }
}


const getGoals = async (req, res) => {
    try {
        const goals = await GoalsModel.find()
        for (i = 0; i < goals.length; i++) {
            const courses_data = await CoursesModel.find({ goal_id: goals[i]._id })
            goals[i].course = courses_data

        }
        return res.json(goals)
    } catch (err) {
        res.send(err.message)
    }
}

const getCourse = async (req, res) => {
    try {
        const courses = await CoursesModel.findById({ _id: req.params.courseId })
        const colleges = await CollegeModel.find({ course_id: courses.id })
        return res.json({ colleges, courses })

    } catch (err) {
        res.status(402).json({ error: err.message });
    }
}

const gettournament = async (req, res) => {
    try {
        const tournament = await TournamentModel.find()
        return res.json(tournament)
    } catch (err) {
        res.send(err.message)
    }
}
const getcountry = async (req, res) => {
    try {
        const country = await CountryModel.find();
        return res.json(country)
    } catch (err) {
        res.send(err.message)
    }
}

const getstate = async (req, res) => {
    try {
        const state = await StateModel.find({ code: req.params.country });
        return res.json(state)
    } catch (err) {
        res.send(err.message)
    }
}

const getcity = async (req, res) => {
    try {
        const city = await CityModel.find({ state_id: req.params.state });
        return res.json(city)
    } catch (err) {
        res.send(err.message)
    }
}

const UpdateProfile = async (req, res) => {
    const id = req.body;
    const { userName, email, phoneNumber, address } = req.body;
    try {
        const user = await UserModel.findOneAndUpdate({ _id: id }, { $set: { userName, email, phoneNumber, address } }, {
            new: true
        });
        return res.json({ msg: "updated sucessfully" }, updateValues)

    } catch (err) {
        res.send(err)
    }

}

const getFriends = async (req, res) => {
    try {
        const session_id = req.user._id
        var users = await UserModel.find();
        users = users.filter((e) => e._id != session_id)
        for (let i = 0; i < users.length; i++) {
            const data = await FriendModel.findOne({ request: users[i]._id, user_id: session_id });
            users[i].friends = (data) ? data : null;
        }
        return res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
const searchFriends = async (req, res) => {
    try {
        const session_id = req.user._id
        var users = await UserModel.find();
        users = users.filter((e) => e._id != session_id)
        for (let i = 0; i < users.length; i++) {
            const data = await FriendModel.findOne({ request: users[i]._id, user_id: session_id });
            users[i].friends = (data) ? data : null;
        }
        const teams = await TeamModel.find()
        return res.json({ users, teams });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getTournaments = async (req, res) => {
    try {
        const tournamentId = req.params.id;
        const tournamnet = await TournamentModel.findById({ _id: tournamentId });
        return res.json(tournamnet)
    } catch (err) {
        res.json({ error: err.message });
    }

}

const getFriend = async (req, res) => {
    try {
        const { request } = req.body;

        const Request = new FriendModel({
            user_id: req.user._id,
            request: request,
            status: "0",
            commit: "add request"
        });
        Request.save();

        return res.json(Request)
    } catch (err) {
        res.json({ error: err.message });
    }
}

const getProduct = async (req, res) => {
    try {
        const products = await ProductModel.find();
        return res.json(products);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching products" }, err);
    }
}

const setteam = async (req, res) => {
    try {
        const {
            games,
            teamName,
            email,
            phoneNumber,
            noOfPlayers,
            substitute,
            homeGround,
            addressOfGround,
            pinCode,
            description,
            teamMembers,
            members,
        } = req.body


        const team = new TeamModel({
            user_id: req.user._id,
            teamName,
            email,
            phoneNumber,
            noOfPlayers,
            substitute,
            homeGround,
            addressOfGround,
            pinCode,
            description,
            teamMembers,
            members,
            games
        })
        team.save();
        return (
            res.json(reply.success(Lang.REGISTER_SUCCESS, team._id))
        )
    } catch (err) {
        res.status(402).json({ error: err.message });


    }

}

const handleDelete = async (req, res) => {
    try {
        const { user_id } = req.body;
        const deletes = await FriendModel.findOneAndDelete({ request: user_id })
        return res.json(deletes)
    } catch (err) {
        res.status(402).json({ error: err.message });
    }
}

const getNotifications = async (req, res) => {
    const user_id = req.user._id
    const notif = await FriendModel.find({ request: user_id }).populate({ path: "user_id", select: ["userName", "phoneNumber", "team", "_id"] });
    return res.json(notif)
}

const getTournamentInfo = async (req, res) => {
    try {
        const id = req.params.id;
        const tournamnet = await TournamentModel.findOne({ _id: id });
        return res.json(tournamnet)
    }
    catch (err) {
        res.json({ error: err.message });
    }
}

const handleApproval = async (req, res) => {
    try {
        const { approve } = req.body
        const approval = await FriendModel.findOneAndUpdate({ _id: approve }, { $set: { status: "1", commit: "request accepted" } });
    } catch (err) {
        return res.json(err)
    }
}

const getUserFriends = async (req, res) => {
    try {
        const user_id = req.user._id;
        const friends = await FriendModel.find({ user_id: user_id })
            .populate({ path: "request", select: ["userName", "phoneNumber", "team", "_id"] })
        const friend = await FriendModel.find({ request: user_id })
            .populate({ path: "user_id", select: ["userName", "phoneNumber", "team", "_id"] })
        return res.json({ friends, friend });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


const getTeams = async (req, res) => {
    try {
        const Teams = await TeamModel.find();
        return res.json(Teams)
    } catch (err) {
        return res.json(err)
    }
}
const addFriend = async (req, res) => {
    try {
        const _id = req.user._id;
        const { user_id } = req.body;
        const addplayer = new AddTeamMemberModel({
            user_id: _id,
            player_id: user_id,
            status: "1",
            commit: "add request"
        });
        addplayer.save()
        return res.json("success")
    } catch (err) {
        return res.json(err)
    }
}

const getPlayers = async (req, res) => {
    try {
        const addedPlayer = await AddTeamMemberModel.find({ user_id: req.user._id }).populate({ path: "player_id", select: ["userName", "_id"] })
        return res.json(addedPlayer)
    } catch (err) {
        return res.json(err)
    }
}

const tournamentRegister = async (req, res) => {
    try {
        const {
            name,
            type_of_game,
            contact,
            start_date,
            end_date,
            total_team_participation,
            tournament_day,
            location,
            state,
            city,
            address
        } = req.body;
        console.log(req.body)
        const tournament = new TournamentModel({
            name,
            type_of_game,
            contact,
            start_date: new Date(start_date),
            end_date: new Date(end_date),
            total_team_participation,
            tournament_day,
            location,
            state,
            city,
            address
        });

        await tournament.save();
        return res.json({ message: "Tournament registered successfully", tournament });
    } catch (err) {
        return res.json({ message: "Error in tournament registration", error: err });
    }
};


const getChatFriend = async (req, res) => {
    try {
        const friendId = req.params.friendId
        const data = await UserModel.findOne({ _id: friendId }).select(["userName", "_id"])
        return res.json(data)
    } catch (err) {
        return res.json(err)
    }
}

const messageControl = async (req, res) => {
    try {
        const { messages, friendId } = req.body
        const message = new MessageModel({
            user_id: req.user._id,
            friend: friendId,
            messages: messages,
            status: "true"
        })
        await message.save();
        return res.json(message)
    } catch (err) {
        return res.json({ msg: "error in backend" }, err)
    }
}

const getChat = async (req, res) => {
    try {
        const friendId = req.params.friendId
        const data = await MessageModel.find({ friend: friendId })
        return res.json(data)
    } catch (err) {
        return res.json(err)
    }
}

const getRecivedMessage = async (req, res) => {
    try {
        const user_id = req.user._id;
        const data = await MessageModel.find({ friend: user_id })
        return res.json(data)
    } catch (err) {
        return res.json({ msg: "error in Reciviing Message" }, err)
    }
}

const searching = async (req, res) => {
    try {
        // console.log(req.query)
        // const search = req.params.search
        const search = req.query.search;
        
        const regex = new RegExp(search, 'i');
        const data = await UserModel.find({ firstName:{$regex: search, $options: "i" } })
        if (data) {
            return res.json(data)
        }
        return res.json({ msg: "User not exist" })
    } catch (err) {
        return res.json("error in searching", err)
    }
}

const getJoinTeam = async (req, res) => {
    try {
        const game = req.params.game;
        const Teams = await TeamModel.find({ games: game });
        return res.json(Teams)
    } catch (err) {
        return res.json(err)
    }
}

module.exports = { getProfile, getGoals, getCourse, setteam, gettournament, getcountry, getstate, getcity, UpdateProfile, getFriends, getTournaments, getFriend, getProduct, handleDelete, getNotifications, getTournamentInfo, handleApproval, getUserFriends, getTeams, addFriend, getPlayers, tournamentRegister, getChatFriend, messageControl, getChat, getRecivedMessage, getUserId, searchFriends, searching, getJoinTeam }