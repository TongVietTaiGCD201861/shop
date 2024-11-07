using BackEnd.Data;
using BackEnd.Dtos;
using BackEnd.Models;
using BackEnd.Services.IServices;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Services
{
    public class DiscountService : IDiscountService
    {
        private readonly ApplicationDbContext _db;

        public DiscountService(ApplicationDbContext db)
        {
            _db = db;
        }
        public async Task<(Discount, string)> AddDiscountAsync(Discount discount)
        {
            var existingDiscountWithCode = await _db.Discounts
                .FirstOrDefaultAsync(d => d.Code == discount.Code);
            if (existingDiscountWithCode != null)
            {
                return (new Discount(), "The discount code already exists.");
            }

            discount.CreatedDate = DateTime.UtcNow; 
            discount.UpdatedDate = DateTime.Now;
            _db.Discounts.Add(discount);
            await _db.SaveChangesAsync();
            return (discount, null);
        }

        public async Task<(Discount, string)> UpdateDiscountAsync(DiscountDto discountDto)
        {
            var discount = await _db.Discounts.FindAsync(discountDto.Id);
            if (discount == null)
            {
                return (new Discount(), "Discount not found.");
            }

            var existingDiscountWithCode = await _db.Discounts
                .FirstOrDefaultAsync(d => d.Code == discountDto.Code && d.Id != discountDto.Id);
            if (existingDiscountWithCode != null)
            {
                return (new Discount(), "The discount code already exists.");
            }

            discount.Name = discountDto.Name;
            discount.Description = discountDto.Description;
            discount.Code = discountDto.Code;
            discount.Expiry = discountDto.Expiry;
            discount.UpdatedDate = DateTime.Now;
            discount.ValueReduced = discountDto.ValueReduced;

            await _db.SaveChangesAsync();
            return (discount, null);
        }

        public async Task<Discount> GetDiscountByIdAsync(int id)
        {
            return await _db.Discounts.FindAsync(id);
        }

        public async Task<IEnumerable<Discount>> GetAllDiscountsAsync()
        {
            return await _db.Discounts
                .OrderByDescending(d => d.CreatedDate)
                .ToListAsync();
        }

        public async Task<(bool, string)> DeleteDiscountAsync(int id)
        {
            var discount = await _db.Discounts.FindAsync(id);
            if (discount == null)
            {
                return (false, "Discount not found.");
            }

            _db.Discounts.Remove(discount);
            await _db.SaveChangesAsync();
            return (true, null);
        }

        public async Task<Discount> GetDiscountByCodeAsync(string code)
        {
            return await _db.Discounts.FirstOrDefaultAsync(d => d.Code == code);
        }
    }
}
