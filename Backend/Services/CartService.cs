using BackEnd.Data;
using BackEnd.Models;
using BackEnd.Services.IServices;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Services
{
    public class CartService : ICartService
    {
        private readonly ApplicationDbContext _db;

        public CartService(ApplicationDbContext db)
        {
            _db = db;
        }

        public Cart GetCart(int userId)
        {
            var cart = _db.Carts
                .Include(c => c.Items)
                    .ThenInclude(ci => ci.Shirt)
                .SingleOrDefault(c => c.UserId == userId);

            if (cart == null)
            {
                throw new ArgumentException($"Cart for user with ID {userId} not found.");
            }

            var shirtIds = cart.Items.Select(ci => ci.Shirt.Id).ToList();

            var images = _db.Images
                .Where(img => shirtIds.Contains(img.IdShirt))
                .ToList();

            foreach (var item in cart.Items)
            {
                var shirtImages = images.Where(img => img.IdShirt == item.Shirt.Id).ToList();
            }

            return cart;
        }

        public void AddItemToCart(int userId, int shirtId, int quantity, string color)
        {
            var cart = _db.Carts
                .Include(c => c.Items)
                .ThenInclude(ci => ci.Shirt)
                .SingleOrDefault(c => c.UserId == userId);

            if (cart == null)
            {
                cart = new Cart { UserId = userId, Items = new List<CartItem>() };
                _db.Carts.Add(cart);
            }

            var cartItem = cart.Items.SingleOrDefault(ci => ci.ShirtId == shirtId);
            if (cartItem != null && cartItem.Color == color)
            {
                cartItem.Quantity += quantity;
                cartItem.Total = cartItem.Quantity * cartItem.Shirt.Price;
            } else {
                var shirt = _db.Shirts.SingleOrDefault(s => s.Id == shirtId);
                if (shirt == null)
                {
                    throw new ArgumentException($"Shirt with ID {shirtId} not found.");
                }

                cartItem = new CartItem
                {
                    ShirtId = shirtId,
                    Quantity = quantity,
                    Total = quantity * shirt.Price,
                    Color = color,
                    Shirt = shirt
                };
                cart.Items.Add(cartItem);
            }
            
            _db.SaveChanges();
        }

        public void RemoveItemFromCart(int userId, int shirtId)
        {
            var cart = _db.Carts
                .Include(c => c.Items)
                .SingleOrDefault(c => c.UserId == userId);

            if (cart == null)
            {
                throw new ArgumentException($"Cart for user with ID {userId} not found.");
            }

            var cartItem = cart.Items.SingleOrDefault(ci => ci.Id == shirtId);
            if (cartItem == null)
            {
                throw new ArgumentException($"Item with Shirt ID {shirtId} not found in cart.");
            }

            cart.Items.Remove(cartItem);

            _db.SaveChanges();
        }

        public async Task<bool> UpdateCartItemQuantityAsync(int cartItemId, int newQuantity)
        {
            var cartItem = await _db.CartItems
                                          .FirstOrDefaultAsync(ci => ci.Id == cartItemId);

            if (cartItem == null)
            {
                return false;
            }

            cartItem.Quantity = newQuantity;

            _db.CartItems.Update(cartItem);
            await _db.SaveChangesAsync();

            return true;
        }
    }
}
