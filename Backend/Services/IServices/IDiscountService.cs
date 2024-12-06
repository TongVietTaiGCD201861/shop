using BackEnd.Dtos;
using BackEnd.Models;

namespace BackEnd.Services.IServices
{
    public interface IDiscountService
    {
        Task<(Discount, string)> AddDiscountAsync(Discount discount);
        Task<(Discount, string)> UpdateDiscountAsync(DiscountDto discountDto);
        Task<Discount> GetDiscountByIdAsync(int id);
        Task<IEnumerable<Discount>> GetAllDiscountsAsync(SearchDiscountDto searchDiscountDto);
        Task<(bool, string)> DeleteDiscountAsync(int id);
        Task<Discount> GetDiscountByCodeAsync(string code);
    }
}
