
using BackEnd.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Services.IServices
{
    public interface IBrandService
    {
        Task<IEnumerable<Brand>> GetAllBrandsAsync();
        IList<Tuple<Shirt, IList<Image>>> getByBrandId(int brandId);
    }
}
