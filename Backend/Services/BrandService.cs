using BackEnd.Data;
using BackEnd.Models;
using BackEnd.Services.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Services
{
    public class BrandService : IBrandService
    {
        private readonly ApplicationDbContext _db;

        public BrandService(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Brand>> GetAllBrandsAsync()
        {
            try
            {
                return await _db.Brands.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new ApplicationException("An error occurred while retrieving brands.", ex);
            }
        }

        public IList<Tuple<Shirt, IList<Image>>> getByBrandId(int brandId)
        {
            var result = (from s in _db.Shirts
                          join i in _db.Images on s.Id equals i.IdShirt into si
                          from img in si.DefaultIfEmpty()
                          select new
                          {
                              Shirt = s,
                              Image = img
                          }).ToList();

            var filteredResult = result.Where(x => brandId == 0 || x.Shirt.BrandId == brandId).ToList();

            var groupedResult = filteredResult.GroupBy(x => x.Shirt.Id).Select(group =>
            {
                var shirt = group.First().Shirt;
                var images = group.Where(x => x.Image != null).Select(x => x.Image).ToList();
                return new Tuple<Shirt, IList<Image>>(shirt, images);
            }).ToList();

            return groupedResult;
        }
    }
}
