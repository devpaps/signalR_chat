using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System;
using Chatty.Api.Models;

namespace SignalRChat.Hubs
{
  public class ChatHub : Hub
  {
    private readonly string _botUser;
    protected readonly IDictionary<string, UserConnection> _connections;

    // Constructor
    public ChatHub(IDictionary<string, UserConnection> connections)
    {
      _botUser = "Chelsea bot";
      _connections = connections;
    }

    // Send rooms that are available to join on "login" screen
    public override Task OnConnectedAsync()
    {
      var rooms = _connections.Values.Select(x => x.Room).ToList();
      Clients.Caller.SendAsync("GetAvailableRooms", rooms);
      return base.OnConnectedAsync();
    }

    // Removes particular connection from dictionary and send an updated list of rooms to all clients
    public override Task OnDisconnectedAsync(Exception exception)
    {
      if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
      {
        var date = DateTime.Now;
        _connections.Remove(Context.ConnectionId);
        Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $" {userConnection.User} has left at {date:HH:mm}");
        SendUsersConnected(userConnection.Room);
      }

      return base.OnDisconnectedAsync(exception);
    }

    public async Task JoinRoom(UserConnection userConnection)
    {
      await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

      _connections[Context.ConnectionId] = userConnection;

      /* Refactor time variable to a model */
      var date = DateTime.Now;
      var time = date.ToString("HH:mm");

      await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has joined the {userConnection.Room} channel", time);

      await SendRooms(userConnection.Room);

      await SendUsersConnected(userConnection.Room);

      //await SendUserThatCreatedChat(userConnection.Room);
    }

    public async Task SendMessage(string message)
    {
      if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
      {
        var date = DateTime.Now;
        var time = date.ToString("HH:mm");
        await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", userConnection.User, message, time);
        await SendRooms(userConnection.Room);
      }
    }

    public Task SendUsersConnected(string room)
    {
      var users = _connections.Values
          .Where(c => c.Room == room)
          .Select(c => c.User);
      return Clients.Group(room).SendAsync("UsersInRoom", users);
    }

    public Task SendRooms(string room)
    {
      var rooms = _connections.Values.Select(x => x.Room).ToList();

      return Clients.Group(room).SendAsync("Rooms", rooms);
    }

    public Task SendUserThatCreatedChat(string room)
    {
      var userCreatedRoom = _connections.Values.Where(y => y.Room == room).Select(y => y.User).FirstOrDefault();
      return Clients.Group(room).SendAsync("CreatedByUser", userCreatedRoom);
    }
  }
}
