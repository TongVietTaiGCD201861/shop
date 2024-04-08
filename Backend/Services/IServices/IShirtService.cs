using BackEnd.Dtos;
using BackEnd.Models;

namespace BackEnd.Services.IServices
{
    public interface IShirtService
    {
        IList<Tuple<Shirt, IList<Image>>> GetAllShirtsAndImages();
        Tuple<Shirt, IList<Image>> GetById(int id);
        bool Delete(int id);
        Shirt Create(Shirt input);
        Tuple<Shirt, IList<Image>> Update(int id, Shirt input, IList<Image> images);

        Task<string> UploadImageAsync(IFormFile file, int idShirt);
    }
}
