using BackEnd.Data;
using BackEnd.Dtos;
using BackEnd.Models;
using BackEnd.Services.IServices;
using Microsoft.EntityFrameworkCore;
using static Org.BouncyCastle.Asn1.Cmp.Challenge;

namespace BackEnd.Services
{
    public class BrandService : IBrandService
    {
        private readonly ApplicationDbContext _db;

        public BrandService(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<Brand> AddBrandAsync(Brand brand)
        {
            brand.CreatedDate = DateTime.UtcNow;
            brand.UpdatedDate = DateTime.UtcNow;

            _db.Brands.Add(brand);
            await _db.SaveChangesAsync();

            return brand;
        }

        public async Task<Brand> UpdateBrandAsync(Brand brand, int id)
        {
            var existingBrand = await _db.Brands.FindAsync(id);
            if (existingBrand == null)
            {
                return null;
            }

            existingBrand.Name = brand.Name;
            existingBrand.Description = brand.Description;
            existingBrand.UpdatedDate = DateTime.UtcNow;

            _db.Brands.Update(existingBrand);
            await _db.SaveChangesAsync();
            return brand;
        }

        public async Task<IEnumerable<Brand>> GetAllBrandsAsync(BranDto branDto)
        {
            try
            {
                var query = _db.Brands.AsQueryable();

                if (!string.IsNullOrWhiteSpace(branDto.Name) && branDto.Name != "null")
                {
                    query = query.Where(b => b.Name.Contains(branDto.Name));
                }

                if(branDto.OperatingStatus != 0)
                {
                    query = query.Where(b => b.OperatingStatus == branDto.OperatingStatus);
                }

                return await query.ToListAsync();
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

        public async Task<bool> DeleteBrandAsync(int id)
        {
            var brand = await _db.Brands.FindAsync(id);
            if (brand == null)
            {
                return false; 
            }

            _db.Brands.Remove(brand);
            await _db.SaveChangesAsync();
            return true; 
        }

        public async Task<Brand> updateStatus(int id, int operatingStatus)
        {
            var existingBrand = await _db.Brands.FindAsync(id);
            if (existingBrand == null)
            {
                return null;
            }

            existingBrand.OperatingStatus = operatingStatus;

            _db.Brands.Update(existingBrand);
            await _db.SaveChangesAsync();
            return existingBrand;
        }
    }
}
