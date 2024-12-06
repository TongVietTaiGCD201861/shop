
using BackEnd.Dtos;
using BackEnd.Models;

namespace BackEnd.Services.IServices
{
    public interface IBrandService
    {
        Task<IEnumerable<Brand>> GetAllBrandsAsync(BranDto branDto);
        IList<Tuple<Shirt, IList<Image>>> getByBrandId(int brandId);
        Task<Brand> AddBrandAsync(Brand brand);
        Task<Brand> UpdateBrandAsync(Brand brand, int id);
        Task<bool> DeleteBrandAsync(int id);
        Task<Brand> updateStatus(int id, int operatingStatus);
    }
}
