using BackEnd.Dtos;
using Microsoft.AspNetCore.SignalR;


namespace BackEnd.Hubs
{
    public class ChatHub : Hub
    {

        private readonly ShareDb _shareDb;

        public ChatHub(ShareDb shareDb) => _shareDb = shareDb;

        public async Task joinChat(ChatMessage message)
        {
            await Clients.All.SendAsync("ReceiveMessage","admin", $"{message.UserName} has joined");
        }

        public async Task JoinSpecificChatRoom(ChatMessage message)
        {
            if (string.IsNullOrEmpty(Context.ConnectionId) || string.IsNullOrEmpty(message.ChatRoom))
            {
                await Clients.Caller.SendAsync("ErrorMessage", "Invalid connection ID or chat room.");
                return;
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, message.ChatRoom);
            _shareDb.connections[Context.ConnectionId] = message;
            await Clients.Group(message.ChatRoom).SendAsync("JoinSpecificChatRoom", "admin", $"{message.UserName} has joined {message.ChatRoom}");
        }

        public async Task SendMessage(string msg)
        {
            if (_shareDb.connections.TryGetValue(Context.ConnectionId, out ChatMessage message))
            {
                await Clients.Group(message.ChatRoom).SendAsync("ReceiveSpecificMessage", message.UserName, msg);
            }
            else
            {
                await Clients.Caller.SendAsync("ErrorMessage", "Your connection is not associated with any chat room.");
            }
        }
    }
}
