using BackEnd.Dtos;
using BackEnd.Models;

namespace BackEnd.Services.IServices
{
    public interface ICartService
    {
        Cart GetCart(int userId);
        void AddItemToCart(int userId, int shirtId, int quantity, string color);
        void RemoveItemFromCart(int userId, int shirtId);
        Task<bool> UpdateCartItemQuantityAsync(int cartItemId, int newQuantity);
    }
}
