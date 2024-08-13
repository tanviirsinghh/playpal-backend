const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');
const { verifyJWT } = require('../services/JWT');


{
    router.get("/getProfile", verifyJWT, UserController.getProfile);
    router.get("/getUserId", verifyJWT, UserController.getUserId);
    router.get("/getGoals", UserController.getGoals);
    router.get("/getCourse/:courseId", UserController.getCourse);
    router.get("/gettournament", UserController.gettournament);
    router.get("/getcountry", UserController.getcountry);
    router.get("/getstate/:country", UserController.getstate);
    router.get("/getcity/:state", UserController.getcity);
    router.get("/getFriend", verifyJWT, UserController.getFriends)
    router.get("/search", verifyJWT, UserController.searchFriends)
    router.get("/getTournamnets/:id", UserController.getTournaments)
    router.get("/getInfo/:id", UserController.getTournamentInfo)
    router.get("/getNotification", verifyJWT, UserController.getNotifications)
    router.get("/yourFriends", verifyJWT, UserController.getUserFriends)
    router.get("/getProduct", UserController.getProduct)
    router.get("/getTeam", UserController.getTeams)
    router.get("/getPlayer", verifyJWT, UserController.getPlayers)
    router.get("/getChatFriend/:friendId", UserController.getChatFriend)
    router.get("/getChat/:friendId", UserController.getChat)
    router.get("/getRecievedMessages", verifyJWT, UserController.getRecivedMessage)
    router.get("/searchFriend", UserController.searching)
}

{
    router.post("/friendRequest", verifyJWT, UserController.getFriend)
    router.post("/addPlayer", verifyJWT, UserController.addFriend)
    router.post("/teamcontrol", verifyJWT, UserController.setteam);
    router.post("/tournamentRegister", verifyJWT, UserController.tournamentRegister)
    router.post("/postMessage", verifyJWT, UserController.messageControl)
    router.get("/getTeams/:game", UserController.getJoinTeam)
}

{
    router.delete("/deleteRequest", UserController.handleDelete)
}

{
    router.put("/approvalRequest", UserController.handleApproval)
    router.put("/updateProfile", verifyJWT, UserController.UpdateProfile);

}





module.exports = router;

