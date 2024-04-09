using BackEnd.Data;
using BackEnd.Models;
using BackEnd.Services.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

namespace BackEnd.Services
{
    public class ShirtService : IShirtService
    {
        private readonly ApplicationDbContext _db;
        private readonly UserService _userService;

        public ShirtService(ApplicationDbContext db)
        {
            _db = db;
        }
        public Shirt Create(Shirt input)
        {
            try
            {
                _db.Shirts.Add(input);
                _db.SaveChanges();
                return input;
            }catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public IList<Tuple<Shirt, IList<Image>>> GetAllShirtsAndImages()
        {
            var result = (from s in _db.Shirts
                          join i in _db.Images on s.Id equals i.IdShirt into si
                          from img in si.DefaultIfEmpty()
                          select new
                          {
                              Shirt = s,
                              Image = img
                          }).ToList();

            var groupedResult = result.GroupBy(x => x.Shirt.Id).Select(group =>
            {
                var shirt = group.First().Shirt;
                var images = group.Where(x => x.Image != null).Select(x => x.Image).ToList();
                return new Tuple<Shirt, IList<Image>>(shirt, images);
            }).ToList();

            return groupedResult;
        }

        public Tuple<Shirt, IList<Image>> GetById(int id)
        {
            var shirt = _db.Shirts.SingleOrDefault(x => x.Id == id);

            if (shirt == null)
            {
                throw new ArgumentException($"Shirt with ID {id} not found.");
            }

            var images = _db.Images.Where(x => x.IdShirt == id).ToList();

            return Tuple.Create(shirt, (IList<Image>)images);
        }

         public Tuple<Shirt, IList<Image>> Update(int id, Shirt input, IList<Image> images)
 {
     using (var transaction = _db.Database.BeginTransaction())
     {
         try
         {
             var existingShirt = _db.Shirts.SingleOrDefault(s => s.Id == id);

             if (existingShirt == null)
             {
                 throw new ArgumentException($"Shirt with ID {id} not found.");
             }
             existingShirt.Id =input.Id;
             existingShirt.Name = input.Name;
             existingShirt.Brand = input.Brand;
             existingShirt.CreatedDate = input.CreatedDate;
             existingShirt.Sex = input.Sex;
             existingShirt.Price = input.Price;

             var existingImages = _db.Images.Where(img => img.IdShirt == id).ToList();
             _db.Images.RemoveRange(existingImages);

             foreach (var image in images)
             {
                 image.Id = 0;
                 image.IdShirt = id;
                 _db.Images.Add(image);
             }

             _db.SaveChanges();
             transaction.Commit();

             return Tuple.Create(existingShirt, images);
         }
         catch (Exception ex)
         {
             Console.WriteLine(ex);
             transaction.Rollback();
             throw;
         }
     }
 }


        public bool Delete(int id)
        {
            var shirt = _db.Shirts.SingleOrDefault(x => x.Id == id);
            if (shirt == null)
            {
                return false; 
            }

            var images = _db.Images.Where(x => x.IdShirt == id);
            _db.Images.RemoveRange(images);

            _db.Shirts.Remove(shirt);

            _db.SaveChanges();

            return true; 
        }


        public async Task<string> UploadImageAsync(IFormFile file, int idShirt)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("File is not selected or empty.");

            if (!file.ContentType.StartsWith("image/"))
                throw new ArgumentException("Uploaded file is not an image.");

            var fileName = $"{Guid.NewGuid().ToString()}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "images", fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var imageUrl = $"{fileName}";
            var imageEntity = new Image
            {
                IdShirt = idShirt,
                ImgPath = imageUrl
            };

            _db.Images.Add(imageEntity);
            await _db.SaveChangesAsync();

            return imageUrl;
        }
    }
}
