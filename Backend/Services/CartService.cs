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

            return cart;
        }

        public IList<Cart> GetAllCarts()
        {
            var carts = _db.Carts
                .Include(c => c.Items)
                .ThenInclude(ci => ci.Shirt)
                .ToList();

            return carts;
        }

        public void AddItemToCart(int userId, int shirtId, int quantity, string color)
        {
            var cart = _db.Carts
                .Include(c => c.Items)
                .ThenInclude(ci => ci.Shirt) // Ensure Shirt is included
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

        public void RemoveItemFromCart(int userId, int shirtId, int quantity)
        {
            var cart = _db.Carts
                .Include(c => c.Items)
                .SingleOrDefault(c => c.UserId == userId);

            if (cart == null)
            {
                throw new ArgumentException($"Cart for user with ID {userId} not found.");
            }

            var cartItem = cart.Items.SingleOrDefault(ci => ci.ShirtId == shirtId);
            if (cartItem == null)
            {
                throw new ArgumentException($"Item with Shirt ID {shirtId} not found in cart.");
            }

            cartItem.Quantity -= quantity;
            var shirt = _db.Shirts.SingleOrDefault(s => s.Id == shirtId);

            if (shirt == null)
            {
                throw new ArgumentException($"Shirt with ID {shirtId} not found.");
            }
            if (cartItem.Quantity <= 0)
            {
                cart.Items.Remove(cartItem);
            }
            else
            {
                cartItem.Total = cartItem.Quantity * cartItem.Shirt.Price;
            }

            _db.SaveChanges();
        }

    
    }
}
