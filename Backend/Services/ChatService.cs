/*using BackEnd.Data;
using BackEnd.Services.IServices;
using BackEnd.Models;
using BackEnd.Services.IServices;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Services
{
    public class ChatService : IChatService
    {
        private readonly ApplicationDbContext _context;
        private readonly IImageServices imageServices;

        public ChatService(
            ApplicationDbContext context,
            IImageServices imageServices
         )
        {
            _context = context;
            imageServices = imageServices;
        }

        public async Task<List<GetChatByUserIdResponse>> GetChatByUserId(int id)
        {
            var chatUser = await _context.ChatUsers
            .Where(cu=> cu.UserId == id )
            .ToListAsync();

            var chatIds = chatUser.Select(cu=> cu.ChatId).Distinct().ToList();

            var ChatUsersContainChatWithUsers=await _context.ChatUsers
            .Where(cu => chatIds.Contains(cu.ChatId))
            .ToListAsync();

            var chats = await _context.Chats
            .Where(c=> chatIds.Contains(c.Id))
            .ToListAsync();

            var userIds = chatUserContainChatWithUser.Select(cu => cu.UserId).Distinct().ToList();

            var users = await _context.Accounts
            .Where(a => userIds.Contains(a.Id))
            .ToListAsync();

            var messages = await _context.ChatMessages
            .OrderByDescending(x => x.CreateAt)
            .Where(cm => chatIds.Contains(cm.chatId))
            .Take(20)
            .ToListAsync();

            var res = new List<GetChatByUserIdRespone>();
        }

        foreach (var chat in chats)
         {
           var chatUser = chatUsers.FirstOrDefault(cu => cu.UserId == id && cu.ChatId == ChatId == chat.Id);

            var userIdsChatWith = chatUsersContainChatWithUsers
           .Where(cu => cu.ChatId == chat.Id && cu.UserId != id)
           .Select(cu => cu.UserId)
           .ToList();

            var userChatWith = user
            .Where(U => userIdsChatWith.Contains(U.Id))
            .ToList();
         }
    }
}
*/